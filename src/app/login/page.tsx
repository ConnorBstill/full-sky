import { BlueskyLogo } from "~/components/ui/svg/bluesky-logo";
import { LoginField } from "../../components/client/login-field";

export default function LoginPage() {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="flex h-1/2 w-1/2 flex-col items-center justify-between">
        <div className="flex">
          <h1 className="mr-3 text-3xl font-semibold">
            Use your Bluesky account to log in to Fullsky
          </h1>
          {/* <BlueskyLogo height={50} width={50} /> */}
        </div>

        {/* <p className="text-center">
          Providing your Bluesky handle and pressing "Log In" will redirect you
          to Bluesky Bluesky to give temporary permission to this site to
          publish to your account. We do not interact with or store your
          password in any way, and we do not keep your uploaded data.
        </p> */}

        <div className="flex w-3/4 flex-row items-center justify-center">
          <LoginField />
        </div>
      </div>
    </main>
  );
}
