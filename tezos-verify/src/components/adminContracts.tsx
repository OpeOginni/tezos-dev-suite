"use client";

import { useQuery } from "@tanstack/react-query";

export default function AdminContractsList(props: { adminAddress: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["adminContracts", props.adminAddress],
    queryFn: async () => {
      const response = await fetch(
        `/api/admin/contracts/?adminAddres=${props.adminAddress}`,
      );

      console.log(response.json());
      return response.json() as Promise<{
        success: boolean;
        contractIds: string[];
      }>;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1>Admin Contracts</h1>
    </div>
  );
}
