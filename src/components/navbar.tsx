"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, ChevronDown, Search } from "lucide-react";

const navLink =
  "text-brand-navy hover:text-brand-navy/80 font-medium tracking-[0.2px] transition-colors";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-md">
      <div className="mx-auto flex h-18 max-w-screen-xl items-center justify-between px-2 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 pl-4">
          <Image
            src="/verisaha-logo.png"
            alt="VeriSaha Teknoloji"
            width={200}
            height={48}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
          {/* Çözümler */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`${navLink} flex items-center gap-1 outline-none`}>
              Çözümler <ChevronDown className="size-4 text-brand-teal" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-64 bg-white text-brand-navy shadow-2xl border border-slate-200"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/cozumler/olcum-izleme"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Ölçüm İzleme
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/cozumler/proje-bazli"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Proje Bazlı Çözümler
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/cozumler/endustriyel-otomasyon"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Endüstriyel Otomasyon
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/cozumler/raporlama"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Raporlama
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/cozumler/uzaktan-izleme"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Uzaktan İzleme
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/cozumler/danismanlik"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Danışmanlık
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sektörler */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`${navLink} flex items-center gap-1 outline-none`}>
              Sektörler <ChevronDown className="size-4 text-brand-teal" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-56 bg-white text-brand-navy shadow-2xl border border-slate-200"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/sektorler/gida-sut"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Gıda & Süt
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/sektorler/kimya"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Kimya
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/sektorler/enerji"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Enerji
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/sektorler/su-atiksu"
                  className="block w-full rounded-md px-3 py-2 hover:bg-slate-100 focus:bg-slate-100"
                >
                  Su & Atıksu
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/referanslar" className={navLink}>
            Referanslar
          </Link>
          <Link href="/blog" className={navLink}>
            Blog
          </Link>
          <Link href="/hakkimizda" className={navLink}>
            Hakkımızda
          </Link>
        </nav>

        {/* Right: CTA + search + mobile trigger */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="hidden rounded-full border-2 border-brand-teal bg-transparent px-5 text-brand-navy hover:bg-brand-teal hover:text-white md:inline-flex"
          >
            <Link href="/iletisim">İletişim</Link>
          </Button>

          <Link
            href="/arama"
            className="hidden p-2 text-brand-navy hover:text-brand-navy/80 md:inline-flex"
            title="Ara"
            aria-label="Ara"
          >
            <Search className="size-5" />
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu className="size-6 text-brand-navy" />
            </SheetTrigger>
	 <SheetContent side="left" className="w-72 bg-white/40 backdrop-blur-sm">
	  <div className="mt-6 flex flex-col gap-4">
	    <div>
	      <span className="font-medium text-brand-navy">Çözümler</span>
	      <div className="ml-4 mt-2 flex flex-col gap-2 text-sm text-slate-700">
	        <SheetClose asChild>
	          <Link href="/cozumler/olcum-izleme">Ölçüm İzleme</Link>
	        </SheetClose>
	        <SheetClose asChild>
	          <Link href="/cozumler/proje-bazli">Proje Bazlı Çözümler</Link>
	        </SheetClose>
	        <SheetClose asChild>
	          <Link href="/cozumler/endustriyel-otomasyon">Endüstriyel Otomasyon</Link>
	        </SheetClose>
	        <SheetClose asChild>
	          <Link href="/cozumler/raporlama">Raporlama</Link>
	        </SheetClose>
	        <SheetClose asChild>
	          <Link href="/cozumler/uzaktan-izleme">Uzaktan İzleme</Link>
	        </SheetClose>
	        <SheetClose asChild>
	          <Link href="/cozumler/danismanlik">Danışmanlık</Link>
	        </SheetClose>
	      </div>
	    </div>

	    <div>
	      <span className="font-medium text-brand-navy">Sektörler</span>
	      <div className="ml-4 mt-2 flex flex-col gap-2 text-sm text-slate-700">
	        <SheetClose asChild>
	          <Link href="/sektorler/gida-sut">Gıda & Süt</Link>
	        </SheetClose>
	        <SheetClose asChild>
	          <Link href="/sektorler/kimya">Kimya</Link>
	        </SheetClose>
	        <SheetClose asChild>
	          <Link href="/sektorler/enerji">Enerji</Link>
	        </SheetClose>
	        <SheetClose asChild>
	          <Link href="/sektorler/su-atiksu">Su & Atıksu</Link>
	        </SheetClose>
	      </div>
	    </div>
	
	    <SheetClose asChild>
	      <Link href="/referanslar" className="font-medium text-brand-navy">Referanslar</Link>
	    </SheetClose>
	    <SheetClose asChild>
	      <Link href="/blog" className="font-medium text-brand-navy">Blog</Link>
	    </SheetClose>
	    <SheetClose asChild>
	      <Link href="/hakkimizda" className="font-medium text-brand-navy">Hakkımızda</Link>
	    </SheetClose>
	
	    <SheetClose asChild>
	      <Button
	        asChild
	        className="mt-2 rounded-full border-2 border-brand-teal text-brand-navy hover:bg-brand-teal hover:text-white"
	      >
	        <Link href="/iletisim">İletişim</Link>
	      </Button>
	    </SheetClose>
	  </div>
	</SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
