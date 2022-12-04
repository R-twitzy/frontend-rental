export default function Logout() {
    localStorage.clear();
    window.location.href = "/login"
}