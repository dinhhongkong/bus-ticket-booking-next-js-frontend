import { get } from "@/api/api";
import { Province } from "@/types/models/Province";
import { useEffect, useState } from "react";

export const useProvince = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);

  const fetchProvinces = async () => {
    try {
      const response : Province[] = await get('/booking/provinces');
      setProvinces(response);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  return { provinces, setProvinces };

}