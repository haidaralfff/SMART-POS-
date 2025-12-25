import { Navigate, useLocation } from "react-router-dom";

// validasi role dengan mengecek username password benar atau tidak
const ProtectedRole = ({ children, role }) => {
    const location = useLocation();

    if (role === "kasir") {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
};


export default ProtectedRole;