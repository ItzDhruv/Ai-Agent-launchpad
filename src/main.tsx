import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';import { WagmiProvider, createConfig, http } from 'wagmi'
import { baseSepolia, hederaTestnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const config = createConfig({
  chains: [baseSepolia, sepolia, hederaTestnet],
  transports: {
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
    [hederaTestnet.id]: http(),
  },
})

const queryClient = new QueryClient()

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  
      
   <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
   
  </StrictMode>
);
