import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // Ensure storeId is properly accessed
  const storeId = params?.storeId;

  if (!storeId) {
    return redirect("/");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId, // Ensures the user owns the store
    },
  });

  if (!store) {
    return redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
