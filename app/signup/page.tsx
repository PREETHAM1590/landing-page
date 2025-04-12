"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Use context hook (for potential future auto-login)
// import { AuthService } from "@/lib/services/AuthService"; // We'll add signup later
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link"; // Import Link

// Assuming a potential signup error structure
interface SignupError extends Error {
  message: string;
}

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Add confirm password
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth(); // Check if already logged in
  const router = useRouter();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      // Placeholder for signup logic
      console.log("Simulating signup for:", username);
      // await AuthService.signup(username, password); // Call signup service later
      alert("Signup successful! (Simulated) Please login."); // Temporary alert
      router.push("/login"); // Redirect to login after simulated signup
    } catch (err) {
      setError((err as SignupError).message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Reuse login page styling/layout
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="floating-slow absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-3xl opacity-70"></div>
        <div className="floating absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-3xl opacity-70"></div>
        <div className="floating-rotate absolute top-1/2 left-1/3 w-24 h-24 bg-primary/20 rounded-3xl opacity-50"></div>
      </div>

      <Card className="w-full max-w-md rounded-3xl shadow-xl backdrop-blur-sm bg-white/80 floating-slow">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-primary">Create Account</CardTitle> {/* Updated Title */}
          <CardDescription className="text-center">Enter your details to sign up</CardDescription> {/* Updated Description */}
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
                placeholder="Choose a username"
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
                placeholder="Create a password"
                className="rounded-full"
              />
            </div>
            <div className="space-y-2"> {/* Add Confirm Password Field */}
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                className="rounded-full"
              />
            </div>
            <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
         <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
