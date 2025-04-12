"use client";

import React, { useState, FormEvent } from "react"; // Import FormEvent
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Use context hook
import { AuthService } from "@/lib/services/AuthService"; // Use service
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Assuming AuthService.login might throw an error with a 'message' property
interface LoginError extends Error {
  message: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth(); // Use the context hook
  const router = useRouter();

  // Redirect if already logged in (using useEffect for client-side redirect)
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    // Render nothing or a loading indicator while redirecting
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Type event
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Use AuthService from shopping-app logic
      const data = await AuthService.login(username, password);
      // Use login function from AuthContext
      login({ username }, data.token); // Assuming login context expects { username: string } and token: string
      router.push("/"); // Redirect on success
    } catch (err) {
      // Type assertion for error message
      setError((err as LoginError).message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Keep the v0 styling/layout
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 overflow-hidden -z-10"> {/* Added z-index */}
        <div className="floating-slow absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-3xl opacity-70"></div>
        <div className="floating absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-3xl opacity-70"></div>
        <div className="floating-rotate absolute top-1/2 left-1/3 w-24 h-24 bg-primary/20 rounded-3xl opacity-50"></div>
      </div>

      <Card className="w-full max-w-md rounded-3xl shadow-xl backdrop-blur-sm bg-white/80 floating-slow">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-primary">Shopme</CardTitle> {/* Updated Title */}
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription> {/* Updated Description */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username" // Updated placeholder
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password" // Updated placeholder
                className="rounded-full"
              />
            </div>
            <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        {/* Removed CardFooter with hint */}
      </Card>
    </div>
  );
}
