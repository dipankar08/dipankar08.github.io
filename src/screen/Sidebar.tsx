import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlineDocumentText } from "react-icons/hi";
import { profile, socialLinks } from "../data/data";

const iconMap = {
  github: FaGithub,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  scholar: SiGooglescholar,
  facebook: FaFacebook,
};

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-0 lg:h-screen flex flex-col items-center lg:items-start pt-8 px-6 lg:pt-14 lg:pl-8 lg:pr-12">
      <div className="flex flex-col items-center lg:items-start">
        <Image
          src={profile.avatarUrl}
          alt={profile.name}
          width={260}
          height={280}
          className="rounded-md object-cover mb-5"
          priority
        />
        <h2 className="text-[20px] font-bold text-[#222] leading-tight">
          {profile.name}
        </h2>
        <p className="text-[14px] text-[#888] mt-1">{profile.title}</p>
        <p className="text-[12px] text-[#999] mt-1">
          Ex-Microsoft | Ex-Facebook | M.Tech CS, IIT Roorkee
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.platform];
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#555] hover:text-[#222] transition-colors"
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>

      <hr className="border-[#e0e0e0] my-6 w-full" />

      <div className="flex flex-col gap-2.5 text-[13px] text-[#666]">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-2 hover:text-[#222] transition-colors"
        >
          <HiOutlineMail size={15} />
          <span>{profile.email}</span>
        </a>
        <div className="flex items-center gap-2">
          <HiOutlineLocationMarker size={15} />
          <span>{profile.location}</span>
        </div>
        {profile.cvUrl && (
          <a
            href={profile.cvUrl}
            className="flex items-center gap-2 hover:text-[#222] transition-colors"
          >
            <HiOutlineDocumentText size={15} />
            <span>CV (as of early 2021)</span>
          </a>
        )}
      </div>
    </aside>
  );
}
