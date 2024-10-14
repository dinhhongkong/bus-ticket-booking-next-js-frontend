import Link from "next/link"
import styles from "./header.module.css"
import Image from "next/image"
export default function Header() {

  return (
    <>
      <div className={ `${styles.headerHomePage} relative mx-auto w-full bg-white text-[13px] block h-[220px]`}>
        <div className="flex m-auto w-[1128px] h-[80px]">
          <div className="mt-4 flex flex-1 items-start"></div>
          <div className={`  z-10 mx-20`}>
            <Link href="/">
              <Image src="/assets/logo_new.svg" width={295} height={60} alt="baner"/>            </Link>
          </div>
          <div className="mt-4 flex flex-1 justify-end">
            <div
              className={"flex items-start gap-4 text-center text-sm font-medium"}>
              {/* {auth.isAuthenticated === false && (
                <Link href="/login"
                      className="flex h-8  justify-center text-[12px] cursor-pointer items-center gap-2 rounded-2xl bg-white p-2 text-black">
                  <img src={person.src} style={{width: "20px", height: "20px"}} alt=""/>
                  <span className={``}>Đăng nhập/Đăng ký</span>
                </Link>
              )}

              {auth.isAuthenticated && (
                <div>
                  <div className={`flex h-8  justify-center text-[12px] cursor-pointer items-center gap-2 rounded-2xl bg-white p-2 text-black`}>
                    <img src={person.src} style={{width: "20px", height: "20px"}} alt=""/>
                    <span className={``}>{auth.username}</span>
                  </div>
                </div>
              )} */}
            </div>
          </div>

        </div>


        <div className={` ${styles.navLinkGroup} lg:content z-20 hidden items-center justify-center lg:flex`}>
          <Link className={`mx-2 w-32 pb-3 text-center text-sm uppercase text-white
      hover:font-bold hover:text-white border-b-4 border-b-white font-bold`} href="/">TRANG CHỦ</Link>
          <Link className={`mx-2 w-32 pb-3 text-center text-sm uppercase text-white
      hover:font-bold hover:text-white border-b-4 border-b-white font-bold`} href="/tra-cuu-ve">TRA CỨU VÉ</Link>
          <Link className={`mx-2 w-32 pb-3 text-center text-sm uppercase text-white
      hover:font-bold hover:text-white border-b-4 border-b-white font-bold`} href="/lien-he">LIÊN HỆ</Link>
          <Link className={`mx-2 w-32 pb-3 text-center text-sm uppercase text-white
      hover:font-bold hover:text-white border-b-4 border-b-white font-bold`} href="/ve-chung-toi">VỀ CHÚNG TÔI</Link>
        </div>
      </div>
    </>

  )
}