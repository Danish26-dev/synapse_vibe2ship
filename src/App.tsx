import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Providers
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QueryProvider } from "./contexts/QueryProvider";
import { FirebaseProvider } from "./contexts/FirebaseProvider";

// Global Layout Containers
import PublicLayout from "./app/layouts/PublicLayout";
import CitizenLayout from "./app/layouts/CitizenLayout";
import AuthorityLayout from "./app/layouts/AuthorityLayout";

// Component Boundaries
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingBoundary from "./components/LoadingBoundary";
import { Toaster } from "./components/ui/Toast";

// Page Views
import LandingPage from "./features/marketing/pages/LandingPage";
import Login from "./features/auth/pages/Login";
import Dashboard from "./features/citizen/pages/Dashboard";
import Report from "./features/citizen/pages/Report";
import Cases from "./features/citizen/pages/Cases";
import AuthorityCases from "./features/authority/pages/Cases";
import AuthorityAnalytics from "./features/authority/pages/Analytics";
import AuthoritySettings from "./features/authority/pages/Settings";

export default function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <FirebaseProvider>
          <AuthProvider>
            <ThemeProvider>
              <BrowserRouter>
                <LoadingBoundary>
                  <Routes>
                    {/* 1. Public Domain Router */}
                    <Route element={<PublicLayout />}>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<Login />} />
                    </Route>

                    {/* 2. Citizen (Resident) Workspace Domain */}
                    <Route
                      element={
                        <ProtectedRoute allowedRoles={["citizen", "authority", "admin"]}>
                          <CitizenLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/report" element={<Report />} />
                      <Route path="/cases" element={<Cases />} />
                    </Route>

                    {/* 3. Authority (Administrative OS) Domain */}
                    <Route
                      element={
                        <ProtectedRoute allowedRoles={["authority", "admin"]}>
                          <AuthorityLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route path="/authority/cases" element={<AuthorityCases />} />
                      <Route path="/authority/analytics" element={<AuthorityAnalytics />} />
                      <Route path="/authority/settings" element={<AuthoritySettings />} />
                    </Route>

                    {/* Fallback route redirection */}
                    <Route path="*" element={<LandingPage />} />
                  </Routes>
                </LoadingBoundary>
                <Toaster position="top-right" />
              </BrowserRouter>
            </ThemeProvider>
          </AuthProvider>
        </FirebaseProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}
