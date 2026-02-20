import { Shield, Lock, Award, FileCheck } from 'lucide-react'

export default function TrustBadges() {
  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-500" />
            256-bit AES Encryption
          </span>
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-500" />
            ESIGN Act & eIDAS Compliant
          </span>
          <span className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-purple-500" />
            Full Audit Trail
          </span>
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            4.8/5 Rating
          </span>
        </div>
      </div>
    </section>
  )
}
