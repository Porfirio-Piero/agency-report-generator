import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
      <div className="gradient-mesh absolute inset-0 opacity-30 pointer-events-none" />
      <SignUp 
        appearance={{
          elements: {
            rootBox: "bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl",
            card: "bg-transparent",
            headerTitle: "text-white text-2xl font-bold",
            headerSubtitle: "text-zinc-400",
            socialButtonsBlockButton: "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white",
            socialButtonsBlockButtonText: "text-white",
            dividerLine: "bg-zinc-700",
            dividerText: "text-zinc-500",
            formFieldLabel: "text-zinc-400",
            formFieldInput: "bg-zinc-800 border-zinc-700 text-white rounded-xl",
            formButtonPrimary: "bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:-to-pink-500 text-white rounded-xl",
            footerActionLink: "text-violet-400 hover:text-violet-300",
          },
        }}
      />
    </div>
  );
}