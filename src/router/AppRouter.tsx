import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../views/Landing/Landing";
import Home from "../views/Home/Home";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
