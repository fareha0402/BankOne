import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from './app/queryClient.js'

import App from './app/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
