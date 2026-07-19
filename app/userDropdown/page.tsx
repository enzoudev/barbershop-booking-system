import Link from 'next/link';

interface UserDropdownProps {
  isOpen: boolean;
  onLogout: () => void;
  onClose: () => void;
}

export default function UserDropdown({ isOpen, onLogout, onClose }: UserDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden text-sm">
      <Link 
        href="/dashboard" 
        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
        onClick={onClose}
      >
        Dashboard
      </Link>
      <button 
        onClick={() => {
          onLogout();
          onClose();
        }}
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
      >
        Sair
      </button>
    </div>
  );
}