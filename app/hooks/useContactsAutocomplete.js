import { useState, useEffect, useRef } from 'react';
import { getAuthHeaders } from '../utils/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
const API_URL = `${API_BASE_URL}/api/user/contacts`;

export default function useContactsAutocomplete() {
  console.log('[useContactsAutocomplete] hook called');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const contactsRef = useRef([]);

  useEffect(() => {
    console.log('[useContactsAutocomplete] useEffect running');
    async function fetchContactsOnce() {
      console.log('[useContactsAutocomplete] fetchContactsOnce called');
      let cached = null;
      try {
        cached = sessionStorage.getItem('allContacts');
        if (cached) {
          const parsed = JSON.parse(cached);
          setContacts(parsed);
          contactsRef.current = parsed;
          setLoading(false);
          console.log('[useContactsAutocomplete] Loaded contacts from sessionStorage', parsed);
          return;
        }
      } catch (err) {
        console.error('[useContactsAutocomplete] Error reading contacts from sessionStorage', err);
      }
      try {
        const headers = {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        };
        console.log('[useContactsAutocomplete] Fetching contacts from API', API_URL, headers);
        const response = await fetch(`${API_URL}?page=1&limit=1000`, {
          method: 'GET',
          headers: headers
        });
        if (!response.ok) {
          setLoading(false);
          console.error('[useContactsAutocomplete] Contacts API response not ok', response.status);
          return;
        }
        const data = await response.json();
        if (data.success) {
          setContacts(data.contacts);
          contactsRef.current = data.contacts;
          sessionStorage.setItem('allContacts', JSON.stringify(data.contacts));
          console.log('[useContactsAutocomplete] Fetched contacts from API', data.contacts);
        } else {
          console.error('[useContactsAutocomplete] Contacts API returned error', data);
        }
      } catch (err) {
        console.error('[useContactsAutocomplete] Error fetching contacts from API', err);
      }
      setLoading(false);
    }
    fetchContactsOnce();
  }, []);

  // Get suggestions for a given input value
  function getSuggestions(input, max = 5) {
    if (!input || !contactsRef.current.length) return [];
    const val = input.toLowerCase();
    return contactsRef.current.filter(c =>
      c.email.toLowerCase().includes(val) ||
      (c.name && c.name.toLowerCase().includes(val))
    ).slice(0, max);
  }

  return { contacts, loading, getSuggestions };
} 