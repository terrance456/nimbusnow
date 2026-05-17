import * as Location from "expo-location";
import { useEffect, useState } from "react";

export type CurrentLocation = {
  lat: number;
  lon: number;
};

export type UseCurrentLocationReturn = {
  location: CurrentLocation | null;
  loading: boolean;
  error: string | null;
};

export const useCurrentLocation = (): UseCurrentLocationReturn => {
  const [location, setLocation] = useState<CurrentLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          throw new Error("Location permission denied");
        }

        const position = await Location.getCurrentPositionAsync({});

        if (!isMounted) {
          return;
        }

        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err instanceof Error ? err.message : "Unable to get location");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    location,
    loading,
    error,
  };
};
