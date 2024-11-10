import type { Redirect} from "next";


const nextConfig: { redirects(): Promise<Redirect[]> } = {
    async redirects(): Promise<{ permanent: boolean; destination: string; source: string }[]> {
        return [
            {
                source: '/',
                destination: '/notes',
                permanent: true, // Utilisez 'false' pour une redirection temporaire
            },
        ];
    },
    // Ajoutez d'autres options de configuration ici
};

export default nextConfig;
