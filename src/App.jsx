import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Desktop, 
  Window, 
  Button, 
  List, 
  ListItem,
  TextField,
  Divider,
  Avatar,
  Frame,
  ScrollView
} from 'react95';
import { 
  TitleBar, 
  TaskBar 
} from '@react95/core';
import { Logo, Computer, RecycleFull } from '@react95/icons';

// Componente de Login estilo Windows 95
const LoginScreen = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <LoginContainer>
      <LoginWindow style={{ width: 340 }}>
        <TitleBar icon={<Logo variant="logo" />}>
          Inicio de sesión de Windows
        </TitleBar>
        <div style={{ padding: 20 }}>
          <p style={{ marginBottom: 15 }}>
            Escriba su nombre de usuario y contraseña para iniciar sesión en Cheqk Network.
          </p>
          
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>Usuario:</label>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 5 }}>Contraseña:</label>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          
          {error && (
            <ErrorMessage>
              Nombre de usuario o contraseña no válidos. Intente de nuevo.
            </ErrorMessage>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button onClick={() => { setUsername(''); setPassword(''); }}>Cancelar</Button>
            <Button onClick={handleSubmit}>Aceptar</Button>
          </div>
        </div>
      </LoginWindow>
    </LoginContainer>
  );
};

// Contenedor del Login
const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #008080;
`;

const LoginWindow = styled.div`
  box-shadow: 2px 2px 0px 0px #000;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 15px;
  font-size: 12px;
`;

// Icono de escritorio personalizado
const DesktopIcon = ({ icon, label, onClick }) => {
  return (
    <IconContainer onClick={onClick}>
      <IconWrapper>{icon}</IconWrapper>
      <IconLabel>{label}</IconLabel>
    </IconContainer>
  );
};

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  margin: 10px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconLabel = styled.span`
  color: white;
  font-size: 11px;
  text-align: center;
  margin-top: 4px;
  text-shadow: 1px 1px 0 #000;
`;

// Aplicación Bloc de Notas
const NotepadApp = ({ onClose, minimized }) => {
  const [text, setText] = useState('');

  if (minimized) return null;

  return (
    <Window style={{ width: 400, height: 300 }}>
      <TitleBar icon={<Logo variant="logo" />} onClose={onClose}>
        Bloc de Notas - Cheqk
      </TitleBar>
      <div style={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', gap: 2, padding: '2px 4px', borderBottom: '1px solid #808080' }}>
          <Button size="small">Archivo</Button>
          <Button size="small">Editar</Button>
          <Button size="small">Ayuda</Button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            resize: 'none',
            padding: 5,
            fontFamily: 'monospace',
            fontSize: 12,
          }}
          placeholder="Escriba aquí..."
        />
      </div>
    </Window>
  );
};

// Aplicación Explorador de Archivos
const FileExplorerApp = ({ onClose, minimized }) => {
  if (minimized) return null;

  const folders = [
    { name: 'Documentos de Cheqk', type: 'folder' },
    { name: 'Proyectos', type: 'folder' },
    { name: 'Recursos', type: 'folder' },
    { name: 'readme.txt', type: 'file' },
    { name: 'about_cheqk.txt', type: 'file' },
  ];

  return (
    <Window style={{ width: 450, height: 320 }}>
      <TitleBar icon={<Computer />} onClose={onClose}>
        Explorador - Cheqk Network
      </TitleBar>
      <div style={{ padding: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', gap: 2, marginBottom: 5 }}>
          <Button size="small">Atrás</Button>
          <Button size="small">Adelante</Button>
          <Button size="small">Arriba</Button>
        </div>
        <Divider />
        <div style={{ flex: 1, overflow: 'auto', marginTop: 5 }}>
          <List>
            {folders.map((item, index) => (
              <ListItem key={index} icon={item.type === 'folder' ? <Computer /> : <Logo variant="logo" />}>
                {item.name}
              </ListItem>
            ))}
          </List>
        </div>
        <div style={{ marginTop: 5, fontSize: 11 }}>
          {folders.length} objeto(s)
        </div>
      </div>
    </Window>
  );
};

// Componente principal de la aplicación
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Estado de las ventanas
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [notepadMinimized, setNotepadMinimized] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerMinimized, setExplorerMinimized] = useState(false);

  // Actualizar reloj
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Manejar login
  const handleLogin = (username, password) => {
    if (username === 'Cheqk' && password === 'Cheqk') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Formatear hora
  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  // Abrir aplicaciones
  const openNotepad = () => {
    setNotepadOpen(true);
    setNotepadMinimized(false);
    setStartMenuOpen(false);
  };

  const openExplorer = () => {
    setExplorerOpen(true);
    setExplorerMinimized(false);
    setStartMenuOpen(false);
  };

  // Si no ha iniciado sesión, mostrar pantalla de login
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} error={loginError} />;
  }

  // Escritorio principal
  return (
    <Desktop
      backgroundColor="#008080"
      style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Iconos del escritorio */}
      <div style={{ 
        position: 'absolute', 
        top: 10, 
        left: 10, 
        display: 'flex', 
        flexDirection: 'column',
        zIndex: 1
      }}>
        <DesktopIcon 
          icon={<MyComputer />} 
          label="Mi PC" 
          onClick={openExplorer}
        />
        <DesktopIcon 
          icon={<RecycleBin />} 
          label="Papelera de Reciclaje" 
          onClick={() => alert('La papelera está vacía')}
        />
        <DesktopIcon 
          icon={<Logo variant="logo" />} 
          label="Cheqk Network" 
          onClick={openNotepad}
        />
      </div>

      {/* Ventana Bloc de Notas */}
      {notepadOpen && (
        <div style={{ 
          position: 'absolute', 
          top: 100, 
          left: 200, 
          zIndex: notepadMinimized ? 0 : 10 
        }}>
          <NotepadApp 
            onClose={() => setNotepadOpen(false)} 
            minimized={notepadMinimized}
          />
        </div>
      )}

      {/* Ventana Explorador */}
      {explorerOpen && (
        <div style={{ 
          position: 'absolute', 
          top: 150, 
          left: 250, 
          zIndex: explorerMinimized ? 0 : 11 
        }}>
          <FileExplorerApp 
            onClose={() => setExplorerOpen(false)} 
            minimized={explorerMinimized}
          />
        </div>
      )}

      {/* Barra de tareas */}
      <Taskbar 
        style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0,
          height: 28
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <StartMenuToggle onClick={() => setStartMenuOpen(!startMenuOpen)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 'bold' }}>
              <Logo variant="logo" style={{ width: 18, height: 18 }} />
              Inicio
            </div>
          </StartMenuToggle>

          {/* Botones de ventanas abiertas */}
          {notepadOpen && (
            <TaskbarItem 
              active={!notepadMinimized}
              onClick={() => setNotepadMinimized(!notepadMinimized)}
            >
              Bloc de Notas
            </TaskbarItem>
          )}
          
          {explorerOpen && (
            <TaskbarItem 
              active={!explorerMinimized}
              onClick={() => setExplorerMinimized(!explorerMinimized)}
            >
              Explorador
            </TaskbarItem>
          )}
        </div>

        {/* Reloj */}
        <Tray>
          <Avatar 
            variant="win95" 
            src="" 
            style={{ marginRight: 8 }}
          />
          <span style={{ fontSize: 11 }}>{formatTime(currentTime)}</span>
        </Tray>
      </Taskbar>

      {/* Menú Inicio */}
      {startMenuOpen && (
        <StartMenuContainer>
          <StartMenuSidebar>
            <Logo variant="logo" style={{ transform: 'rotate(-90deg)', marginTop: 20 }} />
          </StartMenuSidebar>
          <StartMenuContent>
            <StartMenuItem onClick={openExplorer}>
              <MyComputer style={{ marginRight: 8 }} />
              Mi PC
            </StartMenuItem>
            <StartMenuItem onClick={openNotepad}>
              <Logo variant="logo" style={{ marginRight: 8 }} />
              Bloc de Notas
            </StartMenuItem>
            <Divider />
            <StartMenuItem onClick={() => { setIsLoggedIn(false); setStartMenuOpen(false); }}>
              Cerrar sesión
            </StartMenuItem>
          </StartMenuContent>
        </StartMenuContainer>
      )}

      {/* Overlay para cerrar menú inicio al hacer clic fuera */}
      {startMenuOpen && (
        <Overlay onClick={() => setStartMenuOpen(false)} />
      )}
    </Desktop>
  );
}

// Estilos adicionales
const StartMenuToggle = styled(Button)`
  height: 22px;
  margin: 2px;
  padding: 0 8px;
  font-weight: bold;
`;

const TaskbarItem = styled(Button)`
  height: 22px;
  margin: 2px;
  padding: 0 8px;
  min-width: 100px;
  max-width: 150px;
  background-color: ${props => props.active ? '#d4d4d4' : 'transparent'};
`;

const Tray = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 22px;
  border-left: 1px solid #808080;
  margin-left: auto;
  font-size: 11px;
`;

const StartMenuContainer = styled.div`
  position: absolute;
  bottom: 28px;
  left: 0;
  display: flex;
  box-shadow: 2px 2px 0px 0px #000;
  z-index: 1000;
`;

const StartMenuSidebar = styled.div`
  width: 24px;
  background: linear-gradient(180deg, #000080 0%, #0000ff 100%);
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
`;

const StartMenuContent = styled.div`
  background-color: #c0c0c0;
  min-width: 150px;
  padding: 2px;
`;

const StartMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 11px;
  
  &:hover {
    background-color: #000080;
    color: white;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

export default App;
