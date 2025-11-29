import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider";
import AccountsReceivable from "./pages/AccountsReceivable";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountsReceivable />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
