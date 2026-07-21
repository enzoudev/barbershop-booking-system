import Link from 'next/link';
import { logoutService } from '@/services/logoutService';
import { useRouter } from 'next/navigation';
interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDropdown({ isOpen, onClose }: UserDropdownProps) {
  const router = useRouter()
  const onLogout = async () => {
    try {
      await logoutService()
      localStorage.removeItem("userName");
      window.dispatchEvent(new Event("login-update"));
      router.push('/');
      router.refresh()
    } catch (err) {
      console.error('Erro no logout: ', err)
    }
  }
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 pt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden text-sm cursor-pointer">
      <Link 
        href="/dashboard" 
        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
        onClick={onClose}
      >
        Dashboard
      </Link>
      <button 
        onClick={() => {
          onLogout()
          onClose();
        }}
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
      >
        Sair
      </button>
    </div>
  );
}