"use client";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { useParams, useRouter } from "next/navigation";

export const BillboardClient = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex item-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage Billboards of your store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/page`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};
