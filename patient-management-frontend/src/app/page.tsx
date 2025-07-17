import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 h-full flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Patient Management System
            </h1>
            
          </div>

            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="text-lg px-8 py-3">
                  Login to Dashboard
                </Button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
