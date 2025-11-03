import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../services/auth';
import { translations } from '../../utils/translations';
import { currencies } from '../../utils/currencies';

const SettingsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const SettingsCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SettingGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #5a67d8;
  }
`;

const Settings = () => {
  const { user, logout } = useAuth();
  const [language, setLanguage] = useState('fr');
  const [currency, setCurrency] = useState('EUR');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    // Sauvegarder les paramètres
    localStorage.setItem('settings', JSON.stringify({
      language,
      currency,
      email,
      phone
    }));
    alert('Paramètres sauvegardés!');
  };

  return (
    <SettingsContainer>
      <SettingsCard>
        <h2 style={{ marginBottom: '30px', color: '#333' }}>Paramètres</h2>
        
        <SettingGroup>
          <Label>Langue</Label>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {Object.keys(translations).map(lang => (
              <option key={lang} value={lang}>
                {translations[lang].language}
              </option>
            ))}
          </Select>
        </SettingGroup>

        <SettingGroup>
          <Label>Devise</Label>
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {currencies.map(curr => (
              <option key={curr.code} value={curr.code}>
                {curr.name} ({curr.symbol})
              </option>
            ))}
          </Select>
        </SettingGroup>

        <SettingGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
          />
        </SettingGroup>

        <SettingGroup>
          <Label>Numéro de téléphone</Label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Votre numéro de téléphone"
          />
        </SettingGroup>

        <Button onClick={handleSave}>
          Sauvegarder les paramètres
        </Button>
      </SettingsCard>
    </SettingsContainer>
  );
};

export default Settings;
