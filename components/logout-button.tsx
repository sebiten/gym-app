import { logoutAction } from "@/app/login/actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-mist transition hover:bg-white/10"
      >
        Cerrar sesion
      </button>
    </form>
  );
}
