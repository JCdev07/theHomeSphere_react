import { useState } from "react";

export default function useRedirect(initialValue) {
   const [isRedirect, setIsRedirect] = useState(initialValue);

   return [isRedirect, setIsRedirect];
}
