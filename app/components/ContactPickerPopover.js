import React, { useState, useRef, useEffect } from 'react';

export default function ContactPickerPopover({ contacts = [], onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const popoverRef = useRef(null);

  // Filter contacts locally
  const filtered = contacts.filter(c =>
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.name && c.name.toLowerCase().includes(search.toLowerCase()))
  );

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div ref={popoverRef} className="absolute z-50 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search contacts..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        autoFocus
      />
      <div className="max-h-48 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="text-xs text-gray-500 px-2 py-3 text-center">No contacts found</div>
        ) : (
          filtered.map(contact => (
            <button
              key={contact.id}
              onClick={() => { onSelect(contact); onClose(); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 focus:bg-blue-100 text-sm flex flex-col mb-1"
            >
              <span className="font-medium text-gray-900">{contact.email}</span>
              {contact.name && <span className="text-xs text-gray-500">{contact.name}</span>}
            </button>
          ))
        )}
      </div>
    </div>
  );
} 