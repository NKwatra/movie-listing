import React from "react";
import { Cast, ItemDetail } from "../types/itemDetail";
import { client } from "./client";

type PromisesTupleType = [
  Promise<Omit<ItemDetail, "cast">> | undefined,
  Promise<Cast[]> | undefined
];

/**
 *
 * @param media_type the type of media to load detail for : Allowed value "movie" or "tv"
 * @param id  reference id for the given item
 * @returns details of item and status of network request.
 *            {
 *              loading: whether network request is in progress
 *              data: details of item
 *              error: whether the network request failed
 *            }
 */
export const useItemDetail = (media_type: string, id: string) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<null | ItemDetail>(null);
  const [error, setError] = React.useState<null | Error>(null);

  React.useEffect(() => {
    function loadDetails() {
      let promises: PromisesTupleType = [undefined, undefined];
      promises[0] = client
        .get(`/${media_type}/${id}`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        })
        .then((response) => response.data);

      promises[1] = client
        .get(`/${media_type}/${id}/credits`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        })
        .then((response) => response.data.cast);

      Promise.all(promises)
        .then((results) =>
          setData({
            ...(results[0] as Omit<ItemDetail, "cast">),
            cast: results[1] as Cast[],
          })
        )
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }

    loadDetails();
  }, [id, media_type]);

  return { loading, data, error };
};
