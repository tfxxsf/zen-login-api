import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('tk');
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Pix Zen Hub
        </h1>
        <p className="text-muted-foreground">
          Dashboard protegido. Você está autenticado.
        </p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-80 transition-all"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Index;
