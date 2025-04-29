import prismadb from "@/lib/prismadb";

import { PageProps } from "next";
import { BillboardForm } from "./components/billboard-form";

interface BillBoardsPageProps {
  params: {
    storeId: string;
    billboardId: string;
  };
}

interface CustomPageProps extends PageProps {
  params: {
    storeId: string;
    billboardId: string;
  };
}

const BillBoardsPage = async ({ params }: CustomPageProps) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};
export default BillBoardsPage;
