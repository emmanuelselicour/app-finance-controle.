import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../services/auth';

const Bar = styled.header`
  background: #ffffff22;
  color: #fff;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.h1`
  font-size: 1.25rem;
  margin: 0;
`;

const Button = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #ffffff33;
  }
`;

const SettingsLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Bar>
      <Brand>💰 Finance Tracker</Brand>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <SettingsLink href="/settings">⚙️ Paramètres</SettingsLink>
        <Button onClick={logout}>Déconnexion</Button>
      </div>
    </Bar>
  );
}
