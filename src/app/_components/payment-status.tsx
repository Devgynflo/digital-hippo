"use client";

import { trpc } from "@/trpc/client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}

export const PaymentStatus: NextPage<PaymentStatusProps> = ({
  orderEmail,
  orderId,
  isPaid,
}) => {
  const router = useRouter();
  const { data } = trpc.paymentRouter.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    },
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);

  return (
    <div className="gridcols-2 tex-gray-600 mt-16 grid gap-x-4 text-sm">
      <div>
        <p className="font-medium text-gray-900">Expédition à</p>
        <p>{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">
          {isPaid ? "Paiement effectué" : "Paiement en cours"}
        </p>
      </div>
    </div>
  );
};
