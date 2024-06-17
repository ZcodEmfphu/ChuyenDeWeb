import { AppState, Auth0Provider, User, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  // const { createUser } = useCreateMyUser();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientID || !redirectUri) {
    throw new Error("Unable to initiable auth");
  }

  const onRedirectCallback = async (appState?: AppState, user?: User) => {
    const token = await getAccessTokenSilently();
    console.log("token", token);
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0ProviderWithNavigate;
