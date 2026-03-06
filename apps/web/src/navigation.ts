import {createNavigation} from "next-intl/navigation";

export const {Link, usePathname, useRouter, redirect} = createNavigation({
  locales: ["pt", "en"],
  localePrefix: "always",
});
