import { useRef, useState } from "react";
import './App.css'

function App() {
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [passwordLength, setPasswordLength] = useState(15);
  const [password, setPassword] = useState("");
  const successBox = useRef(null);

  const generatePassword = (e) => {
    e.preventDefault();

    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = lowercase.toUpperCase();
    const numbers = "0123456789";
    const specialChars = '!@#$%^&*()_-+=|;"<>.?/';

    const chars =
      lowercase +
      (includeUppercase ? uppercase : "") +
      (includeNumbers ? numbers : "") +
      (includeSpecialChars ? specialChars : "");

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(password);
  };

  const copyPasswordToClipboard = (e) => {
    e.preventDefault();

    if (password.length === 0) return;
    navigator.clipboard.writeText(password);
    successBox.current?.classList.add("message-show");
    setTimeout(() => {
      successBox.current?.classList.remove("message-show");
    }, 3000);
  };
  return (
    <form onSubmit={generatePassword} className="form">
    <h2>Password Generator</h2>
    <div className="form-group">
      <label htmlFor="includeUppercase">
        Include Uppercase Letters
        <input
          type="checkbox"
          id="includeUppercase"
          name="includeUppercase"
          checked={includeUppercase}
          onChange={() => setIncludeUppercase(!includeUppercase)}
        />
      </label>
      <label htmlFor="includeSpecialChars">
        Include Special Characters
        <input
          type="checkbox"
          id="includeSpecialChars"
          name="includeSpecialChars"
          checked={includeSpecialChars}
          onChange={() => {
            setIncludeSpecialChars(!includeSpecialChars);
          }}
        />
      </label>
    </div>
    <div className="form-group">
      <label htmlFor="includeNumbers">
        Include Numbers
        <input
          type="checkbox"
          id="includeNumbers"
          name="includeNumbers"
          checked={includeNumbers}
          onChange={() => {
            setIncludeNumbers(!includeNumbers);
          }}
        />
      </label>
      <label>
        Password Length
        <input
          type="range"
          id="password-range"
          name="password-range"
          min={5}
          max={25}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
        />
        <p className="password-output-length">{passwordLength}</p>
      </label>
    </div>
    <div className="password-output">{password}</div>
    <div className="button-group">
      <button type="submit">Generate</button>
      <button type="button" onClick={copyPasswordToClipboard}>
        Copy Password
      </button>
    </div>
    <div className="success-message" ref={successBox}>
      <p>Password Copied to Clipboard</p>
    </div>
  </form>
  );
}

export default App;
