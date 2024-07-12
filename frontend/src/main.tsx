import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from "@/components/ui/sonner"

import { AuthProvider } from './contexts/auth-provider';
import { ThemeProvider } from './contexts/theme-provider';

import { routes } from './routes';

import { queryClient } from './libs/react-query';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={routes} />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
)
