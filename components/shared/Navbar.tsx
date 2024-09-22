import Link from "next/link";
import { Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

export default function Navbar() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-zinc-800 dark:text-zinc-50">
      <div className="container flex h-[8vh] items-center mx-auto justify-between px-2">
        <div className="flex items-center justify-center">
            {/* Logo and Heading */}
            <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold sm:inline-block">Fragrance Encyclopedia</span> {/* Visible in mobile */}
            </Link>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex">
                <NavigationMenu className="bg-zinc-50">
                <NavigationMenuList className="dark:bg-zinc-800 dark:border-none outline-none dark:shadow-none bg-zinc-50">
                    <NavigationMenuItem>
                    <NavigationMenuTrigger className="dark:bg-zinc-800 dark:border-none">Fragrances</NavigationMenuTrigger>
                    <NavigationMenuContent className="dark:bg-zinc-800 dark:border-none dark:shadow-none">
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] dark:bg-zinc-800 dark:border-none">
                        <li className="row-span-3">
                            <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md dark:bg-zinc-800 p-6 no-underline outline-none dark:shadow-none"
                            href="/"
                            >
                            <div className="mb-2 mt-4 text-lg font-medium dark:text-white">Explore Fragrances</div>
                            <p className="text-sm leading-tight dark:text-gray-400">
                                Discover a world of scents and their unique characteristics.
                            </p>
                            </a>
                        </li>
                        <li><a href="/fragrances/top-rated" className="dark:text-white">Top Rated</a></li>
                        <li><a href="/fragrances/new-releases" className="dark:text-white">New Releases</a></li>
                        <li><a href="/fragrances/brands" className="dark:text-white">Brands</a></li>
                        </ul>
                    </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                    <NavigationMenuTrigger className="dark:bg-zinc-800 dark:border-none">Notes</NavigationMenuTrigger>
                    <NavigationMenuContent className="dark:bg-zinc-800 dark:border-none dark:shadow-none">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-zinc-800 dark:border-none">
                        <li><a href="/notes/top" className="dark:text-white">Top Notes</a></li>
                        <li><a href="/notes/heart" className="dark:text-white">Heart Notes</a></li>
                        <li><a href="/notes/base" className="dark:text-white">Base Notes</a></li>
                        <li><a href="/notes/families" className="dark:text-white">Fragrance Families</a></li>
                        </ul>
                    </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem className="bg-inherit">
                        <Link href="/news" legacyBehavior passHref>
                            <a className="dark:text-white">News</a>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>

        <div className="flex gap-2">            
            <Button variant="outline" size="icon" onClick={() => setCommandOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>

            {/* Light/Dark Mode Toggle */}
            <Button variant = "outline" onClick={() => toggleDarkMode()} className="cursor-pointer p-2">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" /> }
            </Button>

            {/* Mobile Menu (Accordion in Sheet) */}
            <Sheet>
            <SheetTrigger asChild>
                <Button
                variant="outline"
                size="icon"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                <svg
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                >
                    <path d="M3 5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M3 19H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white dark:bg-gray-900 pr-4">
                <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="fragrances">
                    <AccordionTrigger>Fragrances</AccordionTrigger>
                    <AccordionContent>
                    <ul className="space-y-2">
                        <li><a href="/fragrances/top-rated">Top Rated</a></li>
                        <li><a href="/fragrances/new-releases">New Releases</a></li>
                        <li><a href="/fragrances/brands">Brands</a></li>
                    </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="notes">
                    <AccordionTrigger>Notes</AccordionTrigger>
                    <AccordionContent>
                    <ul className="space-y-2">
                        <li><a href="/notes/top">Top Notes</a></li>
                        <li><a href="/notes/heart">Heart Notes</a></li>
                        <li><a href="/notes/base">Base Notes</a></li>
                        <li><a href="/notes/families">Fragrance Families</a></li>
                    </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="news">
                    <AccordionTrigger>News</AccordionTrigger>
                    <AccordionContent>
                        <Link href="/news">News</Link>
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </SheetContent>
            </Sheet>
        </div>
        {/* Search Button */}

        {/* Command Dialog for Search */}
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} className="w-full h-full lg:max-h-[50vh] lg:w-[70vw] bg-zinc-50 p-0 lg:max-w-[70vw] max-w-full">
          <div>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList className="h-full w-full max-h-full max-w-full">
              <CommandEmpty>
                No data. <br />
                Please make a search.
              </CommandEmpty>
            </CommandList>
          </div>
        </CommandDialog>
      </div>
    </header>
  );
}

