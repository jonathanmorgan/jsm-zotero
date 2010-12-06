var extensionToMIMETypeMap = {
	"ez" : "application/andrew-inset",
	"ai" : "application/illustrator",
	"nb" : "application/mathematica",
	"bin" : "application/octet-stream",
	"oda" : "application/oda",
	"pdf" : "application/pdf",
	"xspf" : "application/xspf+xml",
	"pla" : "audio/x-iriver-pla",
	"pgp" : "application/pgp-encrypted",
	"gpg" : "application/pgp-encrypted",
	"asc" : "application/pgp-encrypted",
	"skr" : "application/pgp-keys",
	"pkr" : "application/pgp-keys",
	"asc" : "application/pgp-keys",
	"p7s" : "application/pkcs7-signature",
	"p10" : "application/pkcs10",
	"ps" : "application/postscript",
	"rtf" : "application/rtf",
	"siv" : "application/sieve",
	"smil" : "application/smil",
	"smi" : "application/smil",
	"sml" : "application/smil",
	"kino" : "application/smil",
	"sit" : "application/stuffit",
	"ged" : "application/x-gedcom",
	"gedcom" : "application/x-gedcom",
	"flv" : "application/x-flash-video",
	"sgf" : "application/x-go-sgf",
	"xlf" : "application/x-xliff",
	"xliff" : "application/x-xliff",
	"cdr" : "application/vnd.corel-draw",
	"hpgl" : "application/vnd.hp-hpgl",
	"pcl" : "application/vnd.hp-pcl",
	"123" : "application/vnd.lotus-1-2-3",
	"wk1" : "application/vnd.lotus-1-2-3",
	"wk3" : "application/vnd.lotus-1-2-3",
	"wk4" : "application/vnd.lotus-1-2-3",
	"wks" : "application/vnd.lotus-1-2-3",
	"xul" : "application/vnd.mozilla.xul+xml",
	"mdb" : "application/vnd.ms-access",
	"xls" : "application/vnd.ms-excel",
	"xlsx" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"xlc" : "application/vnd.ms-excel",
	"xll" : "application/vnd.ms-excel",
	"xlm" : "application/vnd.ms-excel",
	"xlw" : "application/vnd.ms-excel",
	"xla" : "application/vnd.ms-excel",
	"xlt" : "application/vnd.ms-excel",
	"xld" : "application/vnd.ms-excel",
	"ppz" : "application/vnd.ms-powerpoint",
	"ppt" : "application/vnd.ms-powerpoint",
	"pptx" : "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	"pps" : "application/vnd.ms-powerpoint",
	"pot" : "application/vnd.ms-powerpoint",
	"xps" : "application/vnd.ms-xpsdocument",
	"doc" : "application/msword",
	"docx" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"tnef" : "application/vnd.ms-tnef",
	"tnf" : "application/vnd.ms-tnef",
	"winmail.dat" : "application/vnd.ms-tnef",
	"sdc" : "application/vnd.stardivision.calc",
	"sds" : "application/vnd.stardivision.chart",
	"sda" : "application/vnd.stardivision.draw",
	"sdd" : "application/vnd.stardivision.impress",
	"sdp" : "application/vnd.stardivision.impress",
	"smd" : "application/vnd.stardivision.mail",
	"smf" : "application/vnd.stardivision.math",
	"sdw" : "application/vnd.stardivision.writer",
	"vor" : "application/vnd.stardivision.writer",
	"sgl" : "application/vnd.stardivision.writer",
	"sxc" : "application/vnd.sun.xml.calc",
	"stc" : "application/vnd.sun.xml.calc.template",
	"sxd" : "application/vnd.sun.xml.draw",
	"std" : "application/vnd.sun.xml.draw.template",
	"sxi" : "application/vnd.sun.xml.impress",
	"sti" : "application/vnd.sun.xml.impress.template",
	"sxm" : "application/vnd.sun.xml.math",
	"sxw" : "application/vnd.sun.xml.writer",
	"sxg" : "application/vnd.sun.xml.writer.global",
	"stw" : "application/vnd.sun.xml.writer.template",
	"odt" : "application/vnd.oasis.opendocument.text",
	"ott" : "application/vnd.oasis.opendocument.text-template",
	"oth" : "application/vnd.oasis.opendocument.text-web",
	"odm" : "application/vnd.oasis.opendocument.text-master",
	"odg" : "application/vnd.oasis.opendocument.graphics",
	"otg" : "application/vnd.oasis.opendocument.graphics-template",
	"odp" : "application/vnd.oasis.opendocument.presentation",
	"otp" : "application/vnd.oasis.opendocument.presentation-template",
	"ods" : "application/vnd.oasis.opendocument.spreadsheet",
	"ots" : "application/vnd.oasis.opendocument.spreadsheet-template",
	"odc" : "application/vnd.oasis.opendocument.chart",
	"odf" : "application/vnd.oasis.opendocument.formula",
	"odb" : "application/vnd.oasis.opendocument.database",
	"odi" : "application/vnd.oasis.opendocument.image",
	"sis" : "application/vnd.symbian.install",
	"sisx" : "x-epoc/x-sisx-app",
	"wp" : "application/vnd.wordperfect",
	"wp4" : "application/vnd.wordperfect",
	"wp5" : "application/vnd.wordperfect",
	"wp6" : "application/vnd.wordperfect",
	"wpd" : "application/vnd.wordperfect",
	"wpp" : "application/vnd.wordperfect",
	"xbel" : "application/x-xbel",
	"7z" : "application/x-7z-compressed",
	"abw" : "application/x-abiword",
	"abw.crashed" : "application/x-abiword",
	"abw.gz" : "application/x-abiword",
	"zabw" : "application/x-abiword",
	"cue" : "application/x-cue",
	"sam" : "application/x-amipro",
	"as" : "application/x-applix-spreadsheet",
	"aw" : "application/x-applix-word",
	"a" : "application/x-archive",
	"arj" : "application/x-arj",
	"asp" : "application/x-asp",
	"bcpio" : "application/x-bcpio",
	"torrent" : "application/x-bittorrent",
	"blender" : "application/x-blender",
	"blend" : "application/x-blender",
	"dvi.bz2" : "application/x-bzdvi",
	"bz" : "application/x-bzip",
	"bz2" : "application/x-bzip",
	"tar.bz" : "application/x-bzip-compressed-tar",
	"tar.bz2" : "application/x-bzip-compressed-tar",
	"tbz" : "application/x-bzip-compressed-tar",
	"tbz2" : "application/x-bzip-compressed-tar",
	"pdf.bz2" : "application/x-bzpdf",
	"ps.bz2" : "application/x-bzpostscript",
	"cbr" : "application/x-cbr",
	"cbz" : "application/x-cbz",
	"iso" : "application/x-cd-image",
	"iso9660" : "application/x-cd-image",
	"cgi" : "application/x-cgi",
	"pgn" : "application/x-chess-pgn",
	"chm" : "application/x-chm",
	"Z" : "application/x-compress",
	"tar.gz" : "application/x-compressed-tar",
	"tgz" : "application/x-compressed-tar",
	"core" : "application/x-core",
	"cpio" : "application/x-cpio",
	"cpio.gz" : "application/x-cpio-compressed",
	"csh" : "application/x-csh",
	"dbf" : "application/x-dbf",
	"es" : "application/ecmascript",
	"dc" : "application/x-dc-rom",
	"nds" : "application/x-nintendo-ds-rom",
	"deb" : "application/x-deb",
	"ui" : "application/x-designer",
	"desktop" : "application/x-desktop",
	"kdelnk" : "application/x-desktop",
	"dia" : "application/x-dia-diagram",
	"dvi" : "application/x-dvi",
	"etheme" : "application/x-e-theme",
	"egon" : "application/x-egon",
	"exe" : "application/x-executable",
	"pfa" : "application/x-font-type1",
	"pfb" : "application/x-font-type1",
	"gsf" : "application/x-font-type1",
	"afm" : "application/x-font-afm",
	"bdf" : "application/x-font-bdf",
	"psf" : "application/x-font-linux-psf",
	"psf.gz" : "application/x-gz-font-linux-psf",
	"pcf" : "application/x-font-pcf",
	"pcf.Z" : "application/x-font-pcf", 
	"pcf.gz" : "application/x-font-pcf",
	"spd" : "application/x-font-speedo",
	"ttf" : "application/x-font-ttf",
	"ttc" : "application/x-font-ttf",
	"gb" : "application/x-gameboy-rom",
	"gba" : "application/x-gba-rom",
	"gen" : "application/x-genesis-rom",
	"md" : "application/x-genesis-rom",
	"gmo" : "application/x-gettext-translation",
	"mo" : "application/x-gettext-translation",
	"glade" : "application/x-glade",
	"gnucash" : "application/x-gnucash",
	"gnc" : "application/x-gnucash",
	"xac" : "application/x-gnucash",
	"gnumeric" : "application/x-gnumeric",
	"gp" : "application/x-gnuplot",
	"gplt" : "application/x-gnuplot",
	"gnuplot" : "application/x-gnuplot",
	"gra" : "application/x-graphite",
	"dvi.gz" : "application/x-gzdvi",
	"gz" : "application/x-gzip",
	"pdf.gz" : "application/x-gzpdf",
	"ps.gz" : "application/x-gzpostscript",
	"hdf" : "application/x-hdf",
	"jar" : "application/x-java-archive",
	"class" : "application/x-java",
	"jnlp" : "application/x-java-jnlp-file",
	"js" : "application/javascript",
	"jpr" : "application/x-jbuilder-project",
	"jpx" : "application/x-jbuilder-project",
	"karbon" : "application/x-karbon",
	"chrt" : "application/x-kchart",
	"kfo" : "application/x-kformula",
	"kil" : "application/x-killustrator",
	"flw" : "application/x-kivio",
	"kon" : "application/x-kontour",
	"kpm" : "application/x-kpovmodeler",
	"kpr" : "application/x-kpresenter",
	"kpt" : "application/x-kpresenter",
	"kra" : "application/x-krita",
	"ksp" : "application/x-kspread",
	"kud" : "application/x-kugar",
	"kwd" : "application/x-kword",
	"kwt" : "application/x-kword",
	"lha" : "application/x-lha",
	"lzh" : "application/x-lha",
	"lhz" : "application/x-lhz",
	"ts" : "application/x-linguist",
	"lyx" : "application/x-lyx",
	"lzo" : "application/x-lzop",
	"mgp" : "application/x-magicpoint",
	"mkv" : "video/x-matroska",
	"mka" : "audio/x-matroska",
	"ocl" : "text/x-ocl",
	"mif" : "application/x-mif",
	"exe" : "application/x-ms-dos-executable",
	"wri" : "application/x-mswrite",
	"msx" : "application/x-msx-rom",
	"m4" : "application/x-m4",
	"n64" : "application/x-n64-rom",
	"nes" : "application/x-nes-rom",
	"cdf" : "application/x-netcdf",
	"nc" : "application/x-netcdf",
	"o" : "application/x-object",
	"ogg" : "application/ogg",
	"ogx" : "application/ogg",
	"oga" : "audio/ogg",
	"ogv" : "video/ogg",
	"ogg" : "audio/x-vorbis+ogg",
	"ogg" : "audio/x-flac+ogg",
	"ogg" : "audio/x-speex+ogg",
	"spx" : "audio/x-speex",
	"ogg" : "video/x-theora+ogg",
	"ogm" : "video/x-ogm+ogg",
	"oleo" : "application/x-oleo",
	"pak" : "application/x-pak",
	"pdb" : "application/x-palm-database",
	"prc" : "application/x-palm-database",
	"par2" : "application/x-par2",
	"pl" : "application/x-perl",
	"pm" : "application/x-perl",
	"al" : "application/x-perl",
	"perl" : "application/x-perl",
	"php" : "application/x-php",
	"php3" : "application/x-php",
	"php4" : "application/x-php",
	"p12" : "application/x-pkcs12",
	"pfx" : "application/x-pkcs12",
	"pln" : "application/x-planperfect",
	"gmon.out" : "application/x-profile",
	"pw" : "application/x-pw",
	"pyc" : "application/x-python-bytecode",
	"pyo" : "application/x-python-bytecode",
	"wb1" : "application/x-quattropro",
	"wb2" : "application/x-quattropro",
	"wb3" : "application/x-quattropro",
	"qtl" : "application/x-quicktime-media-link",
	"qif" : "application/x-qw",
	"rar" : "application/x-rar",
	"dar" : "application/x-dar",
	"rej" : "application/x-reject",
	"rpm" : "application/x-rpm",
	"rb" : "application/x-ruby",
	"mab" : "application/x-markaby",
	"shar" : "application/x-shar",
	"la" : "application/x-shared-library-la",
	"so" : "application/x-sharedlib",
	"sh" : "application/x-shellscript",
	"swf" : "application/x-shockwave-flash",
	"spl" : "application/x-shockwave-flash",
	"shn" : "application/x-shorten",
	"siag" : "application/x-siag",
	"sms" : "application/x-sms-rom",
	"gg" : "application/x-sms-rom",
	"smc" : "application/x-snes-rom",
	"srt" : "application/x-subrip",
	"smi" : "application/x-sami",
	"sami" : "application/x-sami",
	"sub" : "text/x-microdvd",
	"sub" : "text/x-mpsub",
	"ssa" : "text/x-ssa",
	"ass" : "text/x-ssa",
	"sv4cpio" : "application/x-sv4cpio",
	"sv4crc" : "application/x-sv4crc",
	"tar" : "application/x-tar",
	"gtar" : "application/x-tar",
	"tar.z" : "application/x-tarz",
	"gf" : "application/x-tex-gf",
	"pk" : "application/x-tex-pk",
	"obj" : "application/x-tgif",
	"theme" : "application/x-theme",
	"bak" : "application/x-trash",
	"old" : "application/x-trash",
	"sik" : "application/x-trash",
	"tr" : "text/troff",
	"roff" : "text/troff",
	"t" : "text/troff",
	"man" : "application/x-troff-man",
	"tar.lzo" : "application/x-tzo",
	"tzo" : "application/x-tzo",
	"ustar" : "application/x-ustar",
	"src" : "application/x-wais-source",
	"wpg" : "application/x-wpg",
	"der" : "application/x-x509-ca-cert",
	"cer" : "application/x-x509-ca-cert",
	"crt" : "application/x-x509-ca-cert",
	"cert" : "application/x-x509-ca-cert",
	"pem" : "application/x-x509-ca-cert",
	"zoo" : "application/x-zoo",
	"xhtml" : "application/xhtml+xml",
	"zip" : "application/zip",
	"ac3" : "audio/ac3",
	"amr" : "audio/AMR",
	"awb" : "audio/AMR-WB",
	"au" : "audio/basic",
	"snd" : "audio/basic",
	"sid" : "audio/prs.sid",
	"psid" : "audio/prs.sid",
	"aiff" : "audio/x-aiff",
	"aif" : "audio/x-aiff",
	"aifc" : "audio/x-aiff",
	"ape" : "audio/x-ape",
	"it" : "audio/x-it",
	"flac" : "audio/x-flac",
	"wv" : "audio/x-wavpack",
	"wvp" : "audio/x-wavpack",
	"wvc" : "audio/x-wavpack-correction",
	"mid" : "audio/midi",
	"midi" : "audio/midi",
	"kar" : "audio/midi",
	"m4a" : "audio/mp4",
	"aac" : "audio/mp4",
	"mp4" : "video/mp4",
	"m4v" : "video/mp4",
	"m4b" : "audio/x-m4b",
	"3gp" : "video/3gpp",
	"3gpp" : "video/3gpp",
	"amr" : "video/3gpp",
	"mod" : "audio/x-mod",
	"ult" : "audio/x-mod",
	"uni" : "audio/x-mod",
	"m15" : "audio/x-mod",
	"mtm" : "audio/x-mod",
	"669" : "audio/x-mod",
	"mp2" : "audio/mp2",
	"mp3" : "audio/mpeg",
	"mpga" : "audio/mpeg",
	"m3u" : "audio/x-mpegurl",
	"vlc" : "audio/x-mpegurl",
	"asx" : "audio/x-ms-asx",
	"wax" : "audio/x-ms-asx",
	"wvx" : "audio/x-ms-asx",
	"wmx" : "audio/x-ms-asx",
	"psf" : "audio/x-psf",
	"minipsf" : "audio/x-minipsf",
	"psflib" : "audio/x-psflib",
	"wma" : "audio/x-ms-wma",
	"mpc" : "audio/x-musepack",
	"mpp" : "audio/x-musepack",
	"mp+" : "audio/x-musepack",
	"ra" : "audio/vnd.rn-realaudio",
	"rax" : "audio/vnd.rn-realaudio",
	"ram" : "application/ram",
	"rv" : "video/vnd.rn-realvideo",
	"rvx" : "video/vnd.rn-realvideo",
	"rm" : "application/vnd.rn-realmedia",
	"rmj" : "application/vnd.rn-realmedia",
	"rmm" : "application/vnd.rn-realmedia",
	"rms" : "application/vnd.rn-realmedia",
	"rmx" : "application/vnd.rn-realmedia",
	"rmvb" : "application/vnd.rn-realmedia",
	"rp" : "image/vnd.rn-realpix",
	"rt" : "text/vnd.rn-realtext",
	"s3m" : "audio/x-s3m",
	"pls" : "audio/x-scpls",
	"stm" : "audio/x-stm",
	"voc" : "audio/x-voc",
	"wav" : "audio/x-wav",
	"xi" : "audio/x-xi",
	"xm" : "audio/x-xm",
	"tta" : "audio/x-tta",
	"bmp" : "image/bmp",
	"wbmp" : "image/vnd.wap.wbmp",
	"cgm" : "image/cgm",
	"g3" : "image/fax-g3",
	"gif" : "image/gif",
	"ief" : "image/ief",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"jpe" : "image/jpeg",
	"jp2" : "image/jp2",
	"jpc" : "image/jp2",
	"jpx" : "image/jp2",
	"j2k" : "image/jp2",
	"jpf" : "image/jp2",
	"dds" : "image/x-dds",
	"pict" : "image/x-pict",
	"pict1" : "image/x-pict",
	"pict2" : "image/x-pict",
	"ufraw" : "application/x-ufraw",
	"dng" : "image/x-adobe-dng",
	"crw" : "image/x-canon-crw",
	"cr2" : "image/x-canon-cr2",
	"raf" : "image/x-fuji-raf",
	"dcr" : "image/x-kodak-dcr",
	"k25" : "image/x-kodak-k25",
	"kdc" : "image/x-kodak-kdc",
	"mrw" : "image/x-minolta-mrw",
	"nef" : "image/x-nikon-nef",
	"orf" : "image/x-olympus-orf",
	"raw" : "image/x-panasonic-raw",
	"pef" : "image/x-pentax-pef",
	"x3f" : "image/x-sigma-x3f",
	"srf" : "image/x-sony-srf",
	"sr2" : "image/x-sony-sr2",
	"arw" : "image/x-sony-arw",
	"png" : "image/png",
	"rle" : "image/rle",
	"svg" : "image/svg+xml",
	"svgz" : "image/svg+xml-compressed",
	"tif" : "image/tiff",
	"tiff" : "image/tiff",
	"dwg" : "image/vnd.dwg",
	"dxf" : "image/vnd.dxf",
	"3ds" : "image/x-3ds",
	"ag" : "image/x-applix-graphics",
	"eps.bz2" : "image/x-bzeps",
	"epsi.bz2" : "image/x-bzeps",
	"epsf.bz2" : "image/x-bzeps",
	"ras" : "image/x-cmu-raster",
	"xcf.gz" : "image/x-compressed-xcf",
	"xcf.bz2" : "image/x-compressed-xcf",
	"dcm" : "application/dicom",
	"docbook" : "application/docbook+xml",
	"djvu" : "image/vnd.djvu",
	"djv" : "image/vnd.djvu",
	"eps" : "image/x-eps",
	"epsi" : "image/x-eps",
	"epsf" : "image/x-eps",
	"fits" : "image/x-fits",
	"eps.gz" : "image/x-gzeps",
	"epsi.gz" : "image/x-gzeps",
	"epsf.gz" : "image/x-gzeps",
	"ico" : "image/x-ico",
	"icns" : "image/x-icns",
	"iff" : "image/x-iff",
	"ilbm" : "image/x-ilbm",
	"jng" : "image/x-jng",
	"lwo" : "image/x-lwo",
	"lwob" : "image/x-lwo",
	"lws" : "image/x-lws",
	"pntg" : "image/x-macpaint",
	"msod" : "image/x-msod",
	"pcd" : "image/x-photo-cd",
	"pnm" : "image/x-portable-anymap",
	"pbm" : "image/x-portable-bitmap",
	"pgm" : "image/x-portable-graymap",
	"ppm" : "image/x-portable-pixmap",
	"psd" : "image/x-psd",
	"rgb" : "image/x-rgb",
	"sgi" : "image/x-sgi",
	"sun" : "image/x-sun-raster",
	"icb" : "image/x-tga",
	"tga" : "image/x-tga",
	"tpic" : "image/x-tga",
	"vda" : "image/x-tga",
	"vst" : "image/x-tga",
	"cur" : "image/x-win-bitmap",
	"emf" : "image/x-emf",
	"wmf" : "image/x-wmf",
	"xbm" : "image/x-xbitmap",
	"xcf" : "image/x-xcf",
	"fig" : "image/x-xfig",
	"xpm" : "image/x-xpixmap",
	"xwd" : "image/x-xwindowdump",
	"rmail" : "message/x-gnu-rmail",
	"wrl" : "model/vrml",
	"vcs" : "text/calendar",
	"ics" : "text/calendar",
	"css" : "text/css",
	"cssl" : "text/css",
	"vcf" : "text/directory",
	"vct" : "text/directory",
	"gcrd" : "text/directory",
	"t2t" : "text/x-txt2tags",
	"vhd" : "text/x-vhdl",
	"vhdl" : "text/x-vhdl",
	"mml" : "text/mathml",
	"txt" : "text/plain",
	"asc" : "text/plain",
	"rdf" : "text/rdf",
	"rdfs" : "text/rdf",
	"owl" : "text/rdf",
	"rtx" : "text/richtext",
	"rss" : "application/rss+xml",
	"atom" : "application/atom+xml",
	"opml" : "text/x-opml+xml",
	"sgml" : "text/sgml",
	"sgm" : "text/sgml",
	"sylk" : "text/spreadsheet",
	"slk" : "text/spreadsheet",
	"tsv" : "text/tab-separated-values",
	"jad" : "text/vnd.sun.j2me.app-descriptor",
	"wml" : "text/vnd.wap.wml",
	"wmls" : "text/vnd.wap.wmlscript",
	"ace" : "application/x-ace",
	"adb" : "text/x-adasrc",
	"ads" : "text/x-adasrc",
	"authors" : "text/x-authors",
	"bib" : "text/x-bibtex",
	"hh" : "text/x-c++hdr",
	"hp" : "text/x-c++hdr",
	"hpp" : "text/x-c++hdr",
	"h++" : "text/x-c++hdr",
	"hxx" : "text/x-c++hdr",
	"cpp" : "text/x-c++src",
	"cxx" : "text/x-c++src",
	"cc" : "text/x-c++src",
	"c" : "text/x-c++src",
	"c++" : "text/x-c++src",
	"changeLog" : "text/x-changelog",
	"h" : "text/x-chdr",
	"csv" : "text/csv",
	"copying" : "text/x-copying",
	"credits" : "text/x-credits",
	"c" : "text/x-csrc",
	"cs" : "text/x-csharp",
	"vala" : "text/x-vala",
	"dcl" : "text/x-dcl",
	"dsl" : "text/x-dsl",
	"d" : "text/x-dsrc",
	"dtd" : "text/x-dtd",
	"el" : "text/x-emacs-lisp",
	"erl" : "text/x-erlang",
	"f" : "text/x-fortran",
	"f90" : "text/x-fortran",
	"f95" : "text/x-fortran",
	"for" : "text/x-fortran",
	"po" : "text/x-gettext-translation",
	"pot" : "text/x-gettext-translation-template",
	"html" : "text/html",
	"htm" : "text/html",
	"gtkrc" : "text/x-gtkrc",
	"gvp" : "text/x-google-video-pointer",
	"hs" : "text/x-haskell",
	"idl" : "text/x-idl",
	"install" : "text/x-install",
	"java" : "text/x-java",
	"ldif" : "text/x-ldif",
	"lhs" : "text/x-literate-haskell",
	"log" : "text/x-log",
	"makefile" : "text/x-makefile",
	"makefile" : "text/x-makefile",
	"gnumakefile" : "text/x-makefile",
	"moc" : "text/x-moc",
	"mup" : "text/x-mup",
	"not" : "text/x-mup",
	"m" : "text/x-objcsrc",
	"ml" : "text/x-ocaml",
	"mli" : "text/x-ocaml",
	"m" : "text/x-matlab",
	"p" : "text/x-pascal",
	"pas" : "text/x-pascal",
	"diff" : "text/x-patch",
	"patch" : "text/x-patch",
	"py" : "text/x-python",
	"lua" : "text/x-lua",
	"readme" : "text/x-readme",
	"nfo" : "text/x-readme",
	"spec" : "text/x-rpm-spec",
	"scm" : "text/x-scheme",
	"etx" : "text/x-setext",
	"sql" : "text/x-sql",
	"tcl" : "text/x-tcl",
	"tk" : "text/x-tcl",
	"tex" : "text/x-tex",
	"ltx" : "text/x-tex",
	"sty" : "text/x-tex",
	"cls" : "text/x-tex",
	"dtx" : "text/x-tex",
	"ins" : "text/x-tex",
	"latex" : "text/x-tex",
	"texi" : "text/x-texinfo",
	"texinfo" : "text/x-texinfo",
	"me" : "text/x-troff-me",
	"mm" : "text/x-troff-mm",
	"ms" : "text/x-troff-ms",
	"uil" : "text/x-uil",
	"uri" : "text/x-uri",
	"url" : "text/x-uri",
	"xmi" : "text/x-xmi",
	"fo" : "text/x-xslfo",
	"xslfo" : "text/x-xslfo",
	"xml" : "application/xml",
	"xsl" : "application/xml",
	"xslt" : "application/xml",
	"xbl" : "application/xml",
	"dv" : "video/dv",
	"mpeg" : "video/mpeg",
	"mpg" : "video/mpeg",
	"mp2" : "video/mpeg",
	"mpe" : "video/mpeg",
	"vob" : "video/mpeg",
	"m2t" : "video/mpeg",
	"qt" : "video/quicktime",
	"mov" : "video/quicktime",
	"moov" : "video/quicktime",
	"qtvr" : "video/quicktime",
	"qtif" : "image/x-quicktime",
	"qif" : "image/x-quicktime",
	"viv" : "video/vivo",
	"vivo" : "video/vivo",
	"anim1" : "video/x-anim",
	"anim2" : "video/x-anim",
	"anim3" : "video/x-anim",
	"anim4" : "video/x-anim",
	"anim5" : "video/x-anim",
	"anim6" : "video/x-anim",
	"anim7" : "video/x-anim",
	"anim8" : "video/x-anim",
	"anim9" : "video/x-anim",
	"animj" : "video/x-anim",
	"fli" : "video/x-flic",
	"flc" : "video/x-flic",
	"hwp" : "application/x-hwp",
	"hwt" : "application/x-hwt",
	"mng" : "video/x-mng",
	"asf" : "video/x-ms-asf",
	"nsc" : "application/x-netshow-channel",
	"wmv" : "video/x-ms-wmv",
	"avi" : "video/x-msvideo",
	"divx" : "video/x-msvideo",
	"nsv" : "video/x-nsv",
	"sdp" : "application/sdp",
	"movie" : "video/x-sgi-movie",
	"emp" : "application/vnd.emusic-emusic_package",
	"ica" : "application/x-ica",
	"xul" : "application/vnd.mozilla.xul+xml",
	"602" : "application/x-t602"
};

function getMIMEType( fileName_IN )
{

	// modified based on http://www.freedesktop.org/wiki/EdmondCaputo/getMIMEtype%20functions%20PHP%20and%20Javascript?action=AttachFile&do=view&target=getMIMEtype.js

	// return reference
	var value_OUT = "";

	// declare variables
	var fileName = "";
	var fileArray = null;
	var fileExtension = "";
	var fileMIMEType = "";
	
	// initialize default return MIME type
    value_OUT = "binary/octet-stream";

    // make sure we have a string.
    fileName = parseFileName( fileName_IN );
    fileName = new String( fileName );
 
	// got anything?
	if ( ( fileName != null ) && ( fileName != "" ) )
	{
		// convert filename to lower case. 	
	    fileName = fileName.toLowerCase();
	
		// get extension
		fileArray = fileName.split( "." );
	    fileExtension = fileArray[ fileArray.length - 1 ];
	
		// try looking up extension in extensionToMIMETypeMap
		fileMIMEType = extensionToMIMETypeMap[ fileExtension ];
		
		// got anything?
		if ( ( fileMIMEType == null ) || ( fileMIMEType == "" ) )
		{
			// no.  was array longer than 1?
			if ( fileArray.length > 1 )
			{
				// one more thing we can try.  Some of the "extensions" were
				//    things like tar.gz.  Since there was more than one dot,
				//    can try grabbing last two, putting a dot between them,
				//    and looking up again.
				fileExtension = fileArray[ fileArray.length - 2 ] + "." + fileArray[ fileArray.length - 1 ];
				fileMIMEType = extensionToMIMETypeMap[ fileExtension ];
			}
		}
		
		// see if we got anything to return.
		if ( ( fileMIMEType != null ) && ( fileMIMEType != "" ) )
		{
			// got something.  Set value_OUT.
			value_OUT = fileMIMEType;
		}
		
	} //-- end check to make sure a file name was passed in. --//
		
	return value_OUT;

} //-- END function getMIMEType() --//

/*
function getMIMEType( fileName_IN )
{

	// from http://www.freedesktop.org/wiki/EdmondCaputo/getMIMEtype%20functions%20PHP%20and%20Javascript?action=AttachFile&do=view&target=getMIMEtype.js

	// return reference
	var value_OUT = "";

	// declare variables
	var fileName = "";
	
	// initialize default return MIME type
    value_OUT = "binary/octet-stream";

    // make sure we have a string.
    fileName = parseFileName( fileName_IN );
    fileName = new String( fileName );
 
	// got anything?
	if ( ( fileName != null ) && ( fileName != "" ) )
	{
		// convert filename to lower case. 	
	    fileName = fileName.toLowerCase();
	    
	  	// walk through file types we want to 
	    // walk through file types we want to 
        if ( fileName.search(/^.*\.ez$/)>=0 )
        {
            value_OUT = "application/andrew-inset";
        }
        else if ( fileName.search(/^.*\.ai$/) >= 0 )
        {
            value_OUT = "application/illustrator";
        }
        else if ( fileName.search(/^.*\.nb$/) >= 0 )
        {
            value_OUT = "application/mathematica";
        }
        else if ( fileName.search(/^.*\.bin$/) >= 0 )
        {
            value_OUT = "application/octet-stream";
        }
        else if ( fileName.search(/^.*\.oda$/) >= 0 )
        {
            value_OUT = "application/oda";
        }
        else if ( fileName.search(/^.*\.pdf$/) >= 0 )
        {
            value_OUT = "application/pdf";
        }
        else if ( fileName.search(/^.*\.xspf$/) >= 0 )
        {
            value_OUT = "application/xspf+xml";
        }
        else if ( fileName.search(/^.*\.pla$/) >= 0 )
        {
            value_OUT = "audio/x-iriver-pla";
        }
        else if ( fileName.search(/^.*\.pgp$/) >= 0 )
        {
            value_OUT = "application/pgp-encrypted";
        }
        else if ( fileName.search(/^.*\.gpg$/) >= 0 )
        {
            value_OUT = "application/pgp-encrypted";
        }
        else if ( fileName.search(/^.*\.asc$/) >= 0 )
        {
            value_OUT = "application/pgp-encrypted";
        }
        else if ( fileName.search(/^.*\.skr$/) >= 0 )
        {
            value_OUT = "application/pgp-keys";
        }
        else if ( fileName.search(/^.*\.pkr$/) >= 0 )
        {
            value_OUT = "application/pgp-keys";
        }
        else if ( fileName.search(/^.*\.asc$/) >= 0 )
        {
            value_OUT = "application/pgp-keys";
        }
        else if ( fileName.search(/^.*\.p7s$/) >= 0 )
        {
            value_OUT = "application/pkcs7-signature";
        }
        else if ( fileName.search(/^.*\.p10$/) >= 0 )
        {
            value_OUT = "application/pkcs10";
        }
        else if ( fileName.search(/^.*\.ps$/) >= 0 )
        {
            value_OUT = "application/postscript";
        }
        else if ( fileName.search(/^.*\.rtf$/) >= 0 )
        {
            value_OUT = "application/rtf";
        }
        else if ( fileName.search(/^.*\.siv$/) >= 0 )
        {
            value_OUT = "application/sieve";
        }
        else if ( fileName.search(/^.*\.smil$/) >= 0 )
        {
            value_OUT = "application/smil";
        }
        else if ( fileName.search(/^.*\.smi$/) >= 0 )
        {
            value_OUT = "application/smil";
        }
        else if ( fileName.search(/^.*\.sml$/) >= 0 )
        {
            value_OUT = "application/smil";
        }
        else if ( fileName.search(/^.*\.kino$/) >= 0 )
        {
            value_OUT = "application/smil";
        }
        else if ( fileName.search(/^.*\.sit$/) >= 0 )
        {
            value_OUT = "application/stuffit";
        }
        else if ( fileName.search(/^.*\.ged$/) >= 0 )
        {
            value_OUT = "application/x-gedcom";
        }
        else if ( fileName.search(/^.*\.gedcom$/) >= 0 )
        {
            value_OUT = "application/x-gedcom";
        }
        else if ( fileName.search(/^.*\.flv$/) >= 0 )
        {
            value_OUT = "application/x-flash-video";
        }
        else if ( fileName.search(/^.*\.sgf$/) >= 0 )
        {
            value_OUT = "application/x-go-sgf";
        }
        else if ( fileName.search(/^.*\.xlf$/) >= 0 )
        {
            value_OUT = "application/x-xliff";
        }
        else if ( fileName.search(/^.*\.xliff$/) >= 0 )
        {
            value_OUT = "application/x-xliff";
        }
        else if ( fileName.search(/^.*\.cdr$/) >= 0 )
        {
            value_OUT = "application/vnd.corel-draw";
        }
        else if ( fileName.search(/^.*\.hpgl$/) >= 0 )
        {
            value_OUT = "application/vnd.hp-hpgl";
        }
        else if ( fileName.search(/^.*\.pcl$/) >= 0 )
        {
            value_OUT = "application/vnd.hp-pcl";
        }
        else if ( fileName.search(/^.*\.123$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.wk1$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.wk3$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.wk4$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.wks$/) >= 0 )
        {
            value_OUT = "application/vnd.lotus-1-2-3";
        }
        else if ( fileName.search(/^.*\.xul$/) >= 0 )
        {
            value_OUT = "application/vnd.mozilla.xul+xml";
        }
        else if ( fileName.search(/^.*\.mdb$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-access";
        }
        else if ( fileName.search(/^.*\.xls$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xlsx$/) >= 0 )
        {
            value_OUT = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }        
        else if ( fileName.search(/^.*\.xlc$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xll$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xlm$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xlw$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xla$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xlt$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.xld$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-excel";
        }
        else if ( fileName.search(/^.*\.ppz$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-powerpoint";
        }
        else if ( fileName.search(/^.*\.ppt$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-powerpoint";
        }
        else if ( fileName.search(/^.*\.pptx$/) >= 0 )
        {
            value_OUT = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        }
        else if ( fileName.search(/^.*\.pps$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-powerpoint";
        }
        else if ( fileName.search(/^.*\.pot$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-powerpoint";
        }
        else if ( fileName.search(/^.*\.xps$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-xpsdocument";
        }
        else if ( fileName.search(/^.*\.doc$/) >= 0 )
        {
            value_OUT = "application/msword";
        }
        else if ( fileName.search(/^.*\.docx$/) >= 0 )
        {
            value_OUT = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        }
        else if ( fileName.search(/^.*\.tnef$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-tnef";
        }
        else if ( fileName.search(/^.*\.tnf$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-tnef";
        }
        else if ( fileName.search(/^winmail\.dat$/) >= 0 )
        {
            value_OUT = "application/vnd.ms-tnef";
        }
        else if ( fileName.search(/^.*\.sdc$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.calc";
        }
        else if ( fileName.search(/^.*\.sds$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.chart";
        }
        else if ( fileName.search(/^.*\.sda$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.draw";
        }
        else if ( fileName.search(/^.*\.sdd$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.impress";
        }
        else if ( fileName.search(/^.*\.sdp$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.impress";
        }
        else if ( fileName.search(/^.*\.smd$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.mail";
        }
        else if ( fileName.search(/^.*\.smf$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.math";
        }
        else if ( fileName.search(/^.*\.sdw$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.writer";
        }
        else if ( fileName.search(/^.*\.vor$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.writer";
        }
        else if ( fileName.search(/^.*\.sgl$/) >= 0 )
        {
            value_OUT = "application/vnd.stardivision.writer";
        }
        else if ( fileName.search(/^.*\.sxc$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.calc";
        }
        else if ( fileName.search(/^.*\.stc$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.calc.template";
        }
        else if ( fileName.search(/^.*\.sxd$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.draw";
        }
        else if ( fileName.search(/^.*\.std$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.draw.template";
        }
        else if ( fileName.search(/^.*\.sxi$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.impress";
        }
        else if ( fileName.search(/^.*\.sti$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.impress.template";
        }
        else if ( fileName.search(/^.*\.sxm$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.math";
        }
        else if ( fileName.search(/^.*\.sxw$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.writer";
        }
        else if ( fileName.search(/^.*\.sxg$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.writer.global";
        }
        else if ( fileName.search(/^.*\.stw$/) >= 0 )
        {
            value_OUT = "application/vnd.sun.xml.writer.template";
        }
        else if ( fileName.search(/^.*\.odt$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.text";
        }
        else if ( fileName.search(/^.*\.ott$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.text-template";
        }
        else if ( fileName.search(/^.*\.oth$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.text-web";
        }
        else if ( fileName.search(/^.*\.odm$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.text-master";
        }
        else if ( fileName.search(/^.*\.odg$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.graphics";
        }
        else if ( fileName.search(/^.*\.otg$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.graphics-template";
        }
        else if ( fileName.search(/^.*\.odp$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.presentation";
        }
        else if ( fileName.search(/^.*\.otp$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.presentation-template";
        }
        else if ( fileName.search(/^.*\.ods$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.spreadsheet";
        }
        else if ( fileName.search(/^.*\.ots$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.spreadsheet-template";
        }
        else if ( fileName.search(/^.*\.odc$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.chart";
        }
        else if ( fileName.search(/^.*\.odf$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.formula";
        }
        else if ( fileName.search(/^.*\.odb$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.database";
        }
        else if ( fileName.search(/^.*\.odi$/) >= 0 )
        {
            value_OUT = "application/vnd.oasis.opendocument.image";
        }
        else if ( fileName.search(/^.*\.sis$/) >= 0 )
        {
            value_OUT = "application/vnd.symbian.install";
        }
        else if ( fileName.search(/^.*\.sisx$/) >= 0 )
        {
            value_OUT = "x-epoc/x-sisx-app";
        }
        else if ( fileName.search(/^.*\.wp$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wp4$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wp5$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wp6$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wpd$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.wpp$/) >= 0 )
        {
            value_OUT = "application/vnd.wordperfect";
        }
        else if ( fileName.search(/^.*\.xbel$/) >= 0 )
        {
            value_OUT = "application/x-xbel"; }
        else if ( fileName.search(/^.*\.7z$/) >= 0 )
        {
            value_OUT = "application/x-7z-compressed";
        }
        else if ( fileName.search(/^.*\.abw$/) >= 0 )
        {
            value_OUT = "application/x-abiword";
        }
        else if ( fileName.search(/^.*\.abw\.CRASHED$/) >= 0 )
        {
            value_OUT = "application/x-abiword";
        }
        else if ( fileName.search(/^.*\.abw\.gz$/) >= 0 )
        {
            value_OUT = "application/x-abiword";
        }
        else if ( fileName.search(/^.*\.zabw$/) >= 0 )
        {
            value_OUT = "application/x-abiword";
        }
        else if ( fileName.search(/^.*\.cue$/) >= 0 )
        {
            value_OUT = "application/x-cue";
        }
        else if ( fileName.search(/^.*\.sam$/) >= 0 )
        {
            value_OUT = "application/x-amipro";
        }
        else if ( fileName.search(/^.*\.as$/) >= 0 )
        {
            value_OUT = "application/x-applix-spreadsheet";
        }
        else if ( fileName.search(/^.*\.aw$/) >= 0 )
        {
            value_OUT = "application/x-applix-word";
        }
        else if ( fileName.search(/^.*\.a$/) >= 0 )
        {
            value_OUT = "application/x-archive";
        }
        else if ( fileName.search(/^.*\.arj$/) >= 0 )
        {
            value_OUT = "application/x-arj";
        }
        else if ( fileName.search(/^.*\.asp$/) >= 0 )
        {
            value_OUT = "application/x-asp";
        }
        else if ( fileName.search(/^.*\.bcpio$/) >= 0 )
        {
            value_OUT = "application/x-bcpio";
        }
        else if ( fileName.search(/^.*\.torrent$/) >= 0 )
        {
            value_OUT = "application/x-bittorrent";
        }
        else if ( fileName.search(/^.*\.blender$/) >= 0 )
        {
            value_OUT = "application/x-blender";
        }
        else if ( fileName.search(/^.*\.blend$/) >= 0 )
        {
            value_OUT = "application/x-blender";
        }
        else if ( fileName.search(/^.*\.BLEND$/) >= 0 )
        {
            value_OUT = "application/x-blender";
        }
        else if ( fileName.search(/^.*\.dvi\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzdvi";
        }
        else if ( fileName.search(/^.*\.bz$/) >= 0 )
        {
            value_OUT = "application/x-bzip";
        }
        else if ( fileName.search(/^.*\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzip";
        }
        else if ( fileName.search(/^.*\.tar\.bz$/) >= 0 )
        {
            value_OUT = "application/x-bzip-compressed-tar";
        }
        else if ( fileName.search(/^.*\.tar\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzip-compressed-tar";
        }
        else if ( fileName.search(/^.*\.tbz$/) >= 0 )
        {
            value_OUT = "application/x-bzip-compressed-tar";
        }
        else if ( fileName.search(/^.*\.tbz2$/) >= 0 )
        {
            value_OUT = "application/x-bzip-compressed-tar";
        }
        else if ( fileName.search(/^.*\.pdf\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzpdf";
        }
        else if ( fileName.search(/^.*\.ps\.bz2$/) >= 0 )
        {
            value_OUT = "application/x-bzpostscript";
        }
        else if ( fileName.search(/^.*\.cbr$/) >= 0 )
        {
            value_OUT = "application/x-cbr";
        }
        else if ( fileName.search(/^.*\.cbz$/) >= 0 )
        {
            value_OUT = "application/x-cbz";
        }
        else if ( fileName.search(/^.*\.iso$/) >= 0 )
        {
            value_OUT = "application/x-cd-image";
        }
        else if ( fileName.search(/^.*\.iso9660$/) >= 0 )
        {
            value_OUT = "application/x-cd-image";
        }
        else if ( fileName.search(/^.*\.cgi$/) >= 0 )
        {
            value_OUT = "application/x-cgi";
        }
        else if ( fileName.search(/^.*\.pgn$/) >= 0 )
        {
            value_OUT = "application/x-chess-pgn";
        }
        else if ( fileName.search(/^.*\.chm$/) >= 0 )
        {
            value_OUT = "application/x-chm";
        }
        else if ( fileName.search(/^.*\.Z$/) >= 0 )
        {
            value_OUT = "application/x-compress";
        }
        else if ( fileName.search(/^.*\.tar\.gz$/) >= 0 )
        {
            value_OUT = "application/x-compressed-tar";
        }
        else if ( fileName.search(/^.*\.tgz$/) >= 0 )
        {
            value_OUT = "application/x-compressed-tar";
        }
        else if ( fileName.search(/^core$/) >= 0 )
        {
            value_OUT = "application/x-core";
        }
        else if ( fileName.search(/^.*\.cpio$/) >= 0 )
        {
            value_OUT = "application/x-cpio";
        }
        else if ( fileName.search(/^.*\.cpio\.gz$/) >= 0 )
        {
            value_OUT = "application/x-cpio-compressed";
        }
        else if ( fileName.search(/^.*\.csh$/) >= 0 )
        {
            value_OUT = "application/x-csh";
        }
        else if ( fileName.search(/^.*\.dbf$/) >= 0 )
        {
            value_OUT = "application/x-dbf";
        }
        else if ( fileName.search(/^.*\.es$/) >= 0 )
        {
            value_OUT = "application/ecmascript";
        }
        else if ( fileName.search(/^.*\.dc$/) >= 0 )
        {
            value_OUT = "application/x-dc-rom";
        }
        else if ( fileName.search(/^.*\.nds$/) >= 0 )
        {
            value_OUT = "application/x-nintendo-ds-rom";
        }
        else if ( fileName.search(/^.*\.deb$/) >= 0 )
        {
            value_OUT = "application/x-deb";
        }
        else if ( fileName.search(/^.*\.ui$/) >= 0 )
        {
            value_OUT = "application/x-designer";
        }
        else if ( fileName.search(/^.*\.desktop$/) >= 0 )
        {
            value_OUT = "application/x-desktop";
        }
        else if ( fileName.search(/^.*\.kdelnk$/) >= 0 )
        {
            value_OUT = "application/x-desktop";
        }
        else if ( fileName.search(/^.*\.dia$/) >= 0 )
        {
            value_OUT = "application/x-dia-diagram";
        }
        else if ( fileName.search(/^.*\.dvi$/) >= 0 )
        {
            value_OUT = "application/x-dvi";
        }
        else if ( fileName.search(/^.*\.etheme$/) >= 0 )
        {
            value_OUT = "application/x-e-theme";
        }
        else if ( fileName.search(/^.*\.egon$/) >= 0 )
        {
            value_OUT = "application/x-egon";
        }
        else if ( fileName.search(/^.*\.exe$/) >= 0 )
        {
            value_OUT = "application/x-executable";
        }
        else if ( fileName.search(/^.*\.pfa$/) >= 0 )
        {
            value_OUT = "application/x-font-type1";
        }
        else if ( fileName.search(/^.*\.pfb$/) >= 0 )
        {
            value_OUT = "application/x-font-type1";
        }
        else if ( fileName.search(/^.*\.gsf$/) >= 0 )
        {
            value_OUT = "application/x-font-type1";
        }
        else if ( fileName.search(/^.*\.afm$/) >= 0 )
        {
            value_OUT = "application/x-font-afm";
        }
        else if ( fileName.search(/^.*\.bdf$/) >= 0 )
        {
            value_OUT = "application/x-font-bdf";
        }
        else if ( fileName.search(/^.*\.psf$/) >= 0 )
        {
            value_OUT = "application/x-font-linux-psf";
        }
        else if ( fileName.search(/^.*\.psf\.gz$/) >= 0 )
        {
            value_OUT = "application/x-gz-font-linux-psf";
        }
        else if ( fileName.search(/^.*\.pcf$/) >= 0 )
        {
            value_OUT = "application/x-font-pcf";
        }
        else if ( fileName.search(/^.*\.pcf\.Z$/) >= 0 )
        {
            value_OUT = "application/x-font-pcf"; 
        }
        else if ( fileName.search(/^.*\.pcf\.gz$/) >= 0 ) {
            value_OUT = "application/x-font-pcf"; }
        else if ( fileName.search(/^.*\.spd$/) >= 0 ) {
            value_OUT = "application/x-font-speedo"; }
        else if ( fileName.search(/^.*\.ttf$/) >= 0 ) {
            value_OUT = "application/x-font-ttf"; }
        else if ( fileName.search(/^.*\.ttc$/) >= 0 ) {
            value_OUT = "application/x-font-ttf"; }
        else if ( fileName.search(/^.*\.gb$/) >= 0 ) {
            value_OUT = "application/x-gameboy-rom"; }
        else if ( fileName.search(/^.*\.gba$/) >= 0 ) {
            value_OUT = "application/x-gba-rom"; }
        else if ( fileName.search(/^.*\.gen$/) >= 0 ) {
            value_OUT = "application/x-genesis-rom"; }
        else if ( fileName.search(/^.*\.md$/) >= 0 ) {
            value_OUT = "application/x-genesis-rom"; }
        else if ( fileName.search(/^.*\.gmo$/) >= 0 ) {
            value_OUT = "application/x-gettext-translation"; }
        else if ( fileName.search(/^.*\.mo$/) >= 0 ) {
            value_OUT = "application/x-gettext-translation"; }
        else if ( fileName.search(/^.*\.glade$/) >= 0 ) {
            value_OUT = "application/x-glade"; }
        else if ( fileName.search(/^.*\.gnucash$/) >= 0 ) {
            value_OUT = "application/x-gnucash"; }
        else if ( fileName.search(/^.*\.gnc$/) >= 0 ) {
            value_OUT = "application/x-gnucash"; }
        else if ( fileName.search(/^.*\.xac$/) >= 0 ) {
            value_OUT = "application/x-gnucash"; }
        else if ( fileName.search(/^.*\.gnumeric$/) >= 0 ) {
            value_OUT = "application/x-gnumeric"; }
        else if ( fileName.search(/^.*\.gp$/) >= 0 ) {
            value_OUT = "application/x-gnuplot"; }
        else if ( fileName.search(/^.*\.gplt$/) >= 0 ) {
            value_OUT = "application/x-gnuplot"; }
        else if ( fileName.search(/^.*\.gnuplot$/) >= 0 ) {
            value_OUT = "application/x-gnuplot"; }
        else if ( fileName.search(/^.*\.gra$/) >= 0 ) {
            value_OUT = "application/x-graphite"; }
        else if ( fileName.search(/^.*\.dvi\.gz$/) >= 0 ) {
            value_OUT = "application/x-gzdvi"; }
        else if ( fileName.search(/^.*\.gz$/) >= 0 ) {
            value_OUT = "application/x-gzip"; }
        else if ( fileName.search(/^.*\.pdf\.gz$/) >= 0 ) {
            value_OUT = "application/x-gzpdf"; }
        else if ( fileName.search(/^.*\.ps\.gz$/) >= 0 ) {
            value_OUT = "application/x-gzpostscript"; }
        else if ( fileName.search(/^.*\.hdf$/) >= 0 ) {
            value_OUT = "application/x-hdf"; }
        else if ( fileName.search(/^.*\.jar$/) >= 0 ) {
            value_OUT = "application/x-java-archive"; }
        else if ( fileName.search(/^.*\.class$/) >= 0 ) {
            value_OUT = "application/x-java"; }
        else if ( fileName.search(/^.*\.jnlp$/) >= 0 ) {
            value_OUT = "application/x-java-jnlp-file"; }
        else if ( fileName.search(/^.*\.js$/) >= 0 ) {
            value_OUT = "application/javascript"; }
        else if ( fileName.search(/^.*\.jpr$/) >= 0 ) {
            value_OUT = "application/x-jbuilder-project"; }
        else if ( fileName.search(/^.*\.jpx$/) >= 0 ) {
            value_OUT = "application/x-jbuilder-project"; }
        else if ( fileName.search(/^.*\.karbon$/) >= 0 ) {
            value_OUT = "application/x-karbon"; }
        else if ( fileName.search(/^.*\.chrt$/) >= 0 ) {
            value_OUT = "application/x-kchart"; }
        else if ( fileName.search(/^.*\.kfo$/) >= 0 ) {
            value_OUT = "application/x-kformula"; }
        else if ( fileName.search(/^.*\.kil$/) >= 0 ) {
            value_OUT = "application/x-killustrator"; }
        else if ( fileName.search(/^.*\.flw$/) >= 0 ) {
            value_OUT = "application/x-kivio"; }
        else if ( fileName.search(/^.*\.kon$/) >= 0 ) {
            value_OUT = "application/x-kontour"; }
        else if ( fileName.search(/^.*\.kpm$/) >= 0 ) {
            value_OUT = "application/x-kpovmodeler"; }
        else if ( fileName.search(/^.*\.kpr$/) >= 0 ) {
            value_OUT = "application/x-kpresenter"; }
        else if ( fileName.search(/^.*\.kpt$/) >= 0 ) {
            value_OUT = "application/x-kpresenter"; }
        else if ( fileName.search(/^.*\.kra$/) >= 0 ) {
            value_OUT = "application/x-krita"; }
        else if ( fileName.search(/^.*\.ksp$/) >= 0 ) {
            value_OUT = "application/x-kspread"; }
        else if ( fileName.search(/^.*\.kud$/) >= 0 ) {
            value_OUT = "application/x-kugar"; }
        else if ( fileName.search(/^.*\.kwd$/) >= 0 ) {
            value_OUT = "application/x-kword"; }
        else if ( fileName.search(/^.*\.kwt$/) >= 0 ) {
            value_OUT = "application/x-kword"; }
        else if ( fileName.search(/^.*\.lha$/) >= 0 ) {
            value_OUT = "application/x-lha"; }
        else if ( fileName.search(/^.*\.lzh$/) >= 0 ) {
            value_OUT = "application/x-lha"; }
        else if ( fileName.search(/^.*\.lhz$/) >= 0 ) {
            value_OUT = "application/x-lhz"; }
        else if ( fileName.search(/^.*\.ts$/) >= 0 ) {
            value_OUT = "application/x-linguist"; }
        else if ( fileName.search(/^.*\.lyx$/) >= 0 ) {
            value_OUT = "application/x-lyx"; }
        else if ( fileName.search(/^.*\.lzo$/) >= 0 ) {
            value_OUT = "application/x-lzop"; }
        else if ( fileName.search(/^.*\.mgp$/) >= 0 ) {
            value_OUT = "application/x-magicpoint"; }
        else if ( fileName.search(/^.*\.mkv$/) >= 0 ) {
            value_OUT = "video/x-matroska"; }
        else if ( fileName.search(/^.*\.mka$/) >= 0 ) {
            value_OUT = "audio/x-matroska"; }
        else if ( fileName.search(/^.*\.ocl$/) >= 0 ) {
            value_OUT = "text/x-ocl"; }
        else if ( fileName.search(/^.*\.mif$/) >= 0 ) {
            value_OUT = "application/x-mif"; }
        else if ( fileName.search(/^.*\.exe$/) >= 0 ) {
            value_OUT = "application/x-ms-dos-executable"; }
        else if ( fileName.search(/^.*\.wri$/) >= 0 ) {
            value_OUT = "application/x-mswrite"; }
        else if ( fileName.search(/^.*\.msx$/) >= 0 ) {
            value_OUT = "application/x-msx-rom"; }
        else if ( fileName.search(/^.*\.m4$/) >= 0 ) {
            value_OUT = "application/x-m4"; }
        else if ( fileName.search(/^.*\.n64$/) >= 0 ) {
            value_OUT = "application/x-n64-rom"; }
        else if ( fileName.search(/^.*\.nes$/) >= 0 ) {
            value_OUT = "application/x-nes-rom"; }
        else if ( fileName.search(/^.*\.cdf$/) >= 0 ) {
            value_OUT = "application/x-netcdf"; }
        else if ( fileName.search(/^.*\.nc$/) >= 0 ) {
            value_OUT = "application/x-netcdf"; }
        else if ( fileName.search(/^.*\.o$/) >= 0 ) {
            value_OUT = "application/x-object"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "application/ogg"; }
        else if ( fileName.search(/^.*\.ogx$/) >= 0 ) {
            value_OUT = "application/ogg"; }
        else if ( fileName.search(/^.*\.oga$/) >= 0 ) {
            value_OUT = "audio/ogg"; }
        else if ( fileName.search(/^.*\.ogv$/) >= 0 ) {
            value_OUT = "video/ogg"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "audio/x-vorbis+ogg"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "audio/x-flac+ogg"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "audio/x-speex+ogg"; }
        else if ( fileName.search(/^.*\.spx$/) >= 0 ) {
            value_OUT = "audio/x-speex"; }
        else if ( fileName.search(/^.*\.ogg$/) >= 0 ) {
            value_OUT = "video/x-theora+ogg"; }
        else if ( fileName.search(/^.*\.ogm$/) >= 0 ) {
            value_OUT = "video/x-ogm+ogg"; }
        else if ( fileName.search(/^.*\.oleo$/) >= 0 ) {
            value_OUT = "application/x-oleo"; }
        else if ( fileName.search(/^.*\.pak$/) >= 0 ) {
            value_OUT = "application/x-pak"; }
        else if ( fileName.search(/^.*\.pdb$/) >= 0 ) {
            value_OUT = "application/x-palm-database"; }
        else if ( fileName.search(/^.*\.prc$/) >= 0 ) {
            value_OUT = "application/x-palm-database"; }
        else if ( fileName.search(/^.*\.PAR2$/) >= 0 ) {
            value_OUT = "application/x-par2"; }
        else if ( fileName.search(/^.*\.par2$/) >= 0 ) {
            value_OUT = "application/x-par2"; }
        else if ( fileName.search(/^.*\.pl$/) >= 0 ) {
            value_OUT = "application/x-perl"; }
        else if ( fileName.search(/^.*\.pm$/) >= 0 ) {
            value_OUT = "application/x-perl"; }
        else if ( fileName.search(/^.*\.al$/) >= 0 ) {
            value_OUT = "application/x-perl"; }
        else if ( fileName.search(/^.*\.perl$/) >= 0 ) {
            value_OUT = "application/x-perl"; }
        else if ( fileName.search(/^.*\.php$/) >= 0 ) {
            value_OUT = "application/x-php"; }
        else if ( fileName.search(/^.*\.php3$/) >= 0 ) {
            value_OUT = "application/x-php"; }
        else if ( fileName.search(/^.*\.php4$/) >= 0 ) {
            value_OUT = "application/x-php"; }
        else if ( fileName.search(/^.*\.p12$/) >= 0 ) {
            value_OUT = "application/x-pkcs12"; }
        else if ( fileName.search(/^.*\.pfx$/) >= 0 ) {
            value_OUT = "application/x-pkcs12"; }
        else if ( fileName.search(/^.*\.pln$/) >= 0 ) {
            value_OUT = "application/x-planperfect"; }
        else if ( fileName.search(/^gmon\.out$/) >= 0 ) {
            value_OUT = "application/x-profile"; }
        else if ( fileName.search(/^.*\.pw$/) >= 0 ) {
            value_OUT = "application/x-pw"; }
        else if ( fileName.search(/^.*\.pyc$/) >= 0 ) {
            value_OUT = "application/x-python-bytecode"; }
        else if ( fileName.search(/^.*\.pyo$/) >= 0 ) {
            value_OUT = "application/x-python-bytecode"; }
        else if ( fileName.search(/^.*\.wb1$/) >= 0 ) {
            value_OUT = "application/x-quattropro"; }
        else if ( fileName.search(/^.*\.wb2$/) >= 0 ) {
            value_OUT = "application/x-quattropro"; }
        else if ( fileName.search(/^.*\.wb3$/) >= 0 ) {
            value_OUT = "application/x-quattropro"; }
        else if ( fileName.search(/^.*\.qtl$/) >= 0 ) {
            value_OUT = "application/x-quicktime-media-link"; }
        else if ( fileName.search(/^.*\.qif$/) >= 0 ) {
            value_OUT = "application/x-qw"; }
        else if ( fileName.search(/^.*\.rar$/) >= 0 ) {
            value_OUT = "application/x-rar"; }
        else if ( fileName.search(/^.*\.dar$/) >= 0 ) {
            value_OUT = "application/x-dar"; }
        else if ( fileName.search(/^.*\.rej$/) >= 0 ) {
            value_OUT = "application/x-reject"; }
        else if ( fileName.search(/^.*\.rpm$/) >= 0 ) {
            value_OUT = "application/x-rpm"; }
        else if ( fileName.search(/^.*\.rb$/) >= 0 ) {
            value_OUT = "application/x-ruby"; }
        else if ( fileName.search(/^.*\.mab$/) >= 0 ) {
            value_OUT = "application/x-markaby"; }
        else if ( fileName.search(/^.*\.shar$/) >= 0 ) {
            value_OUT = "application/x-shar"; }
        else if ( fileName.search(/^.*\.la$/) >= 0 ) {
            value_OUT = "application/x-shared-library-la"; }
        else if ( fileName.search(/^.*\.so$/) >= 0 ) {
            value_OUT = "application/x-sharedlib"; }
        else if ( fileName.search(/^.*\.sh$/) >= 0 ) {
            value_OUT = "application/x-shellscript"; }
        else if ( fileName.search(/^.*\.swf$/) >= 0 ) {
            value_OUT = "application/x-shockwave-flash"; }
        else if ( fileName.search(/^.*\.spl$/) >= 0 ) {
            value_OUT = "application/x-shockwave-flash"; }
        else if ( fileName.search(/^.*\.shn$/) >= 0 ) {
            value_OUT = "application/x-shorten"; }
        else if ( fileName.search(/^.*\.siag$/) >= 0 ) {
            value_OUT = "application/x-siag"; }
        else if ( fileName.search(/^.*\.sms$/) >= 0 ) {
            value_OUT = "application/x-sms-rom"; }
        else if ( fileName.search(/^.*\.gg$/) >= 0 ) {
            value_OUT = "application/x-sms-rom"; }
        else if ( fileName.search(/^.*\.smc$/) >= 0 ) {
            value_OUT = "application/x-snes-rom"; }
        else if ( fileName.search(/^.*\.srt$/) >= 0 ) {
            value_OUT = "application/x-subrip"; }
        else if ( fileName.search(/^.*\.smi$/) >= 0 ) {
            value_OUT = "application/x-sami"; }
        else if ( fileName.search(/^.*\.sami$/) >= 0 ) {
            value_OUT = "application/x-sami"; }
        else if ( fileName.search(/^.*\.sub$/) >= 0 ) {
            value_OUT = "text/x-microdvd"; }
        else if ( fileName.search(/^.*\.sub$/) >= 0 ) {
            value_OUT = "text/x-mpsub"; }
        else if ( fileName.search(/^.*\.ssa$/) >= 0 ) {
            value_OUT = "text/x-ssa"; }
        else if ( fileName.search(/^.*\.ass$/) >= 0 ) {
            value_OUT = "text/x-ssa"; }
        else if ( fileName.search(/^.*\.sv4cpio$/) >= 0 ) {
            value_OUT = "application/x-sv4cpio"; }
        else if ( fileName.search(/^.*\.sv4crc$/) >= 0 ) {
            value_OUT = "application/x-sv4crc"; }
        else if ( fileName.search(/^.*\.tar$/) >= 0 ) {
            value_OUT = "application/x-tar"; }
        else if ( fileName.search(/^.*\.gtar$/) >= 0 ) {
            value_OUT = "application/x-tar"; }
        else if ( fileName.search(/^.*\.tar\.Z$/) >= 0 ) {
            value_OUT = "application/x-tarz"; }
        else if ( fileName.search(/^.*\.gf$/) >= 0 ) {
            value_OUT = "application/x-tex-gf"; }
        else if ( fileName.search(/^.*\.pk$/) >= 0 ) {
            value_OUT = "application/x-tex-pk"; }
        else if ( fileName.search(/^.*\.obj$/) >= 0 ) {
            value_OUT = "application/x-tgif"; }
        else if ( fileName.search(/^.*\.theme$/) >= 0 ) {
            value_OUT = "application/x-theme"; }
        else if ( fileName.search(/^.*~$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*%$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*\.bak$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*\.old$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*\.sik$/) >= 0 ) {
            value_OUT = "application/x-trash"; }
        else if ( fileName.search(/^.*\.tr$/) >= 0 ) {
            value_OUT = "text/troff"; }
        else if ( fileName.search(/^.*\.roff$/) >= 0 ) {
            value_OUT = "text/troff"; }
        else if ( fileName.search(/^.*\.t$/) >= 0 ) {
            value_OUT = "text/troff"; }
        else if ( fileName.search(/^.*\.man$/) >= 0 ) {
            value_OUT = "application/x-troff-man"; }
        else if ( fileName.search(/^.*\.tar\.lzo$/) >= 0 ) {
            value_OUT = "application/x-tzo"; }
        else if ( fileName.search(/^.*\.tzo$/) >= 0 ) {
            value_OUT = "application/x-tzo"; }
        else if ( fileName.search(/^.*\.ustar$/) >= 0 ) {
            value_OUT = "application/x-ustar"; }
        else if ( fileName.search(/^.*\.src$/) >= 0 ) {
            value_OUT = "application/x-wais-source"; }
        else if ( fileName.search(/^.*\.wpg$/) >= 0 ) {
            value_OUT = "application/x-wpg"; }
        else if ( fileName.search(/^.*\.der$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.cer$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.crt$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.cert$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.pem$/) >= 0 ) {
            value_OUT = "application/x-x509-ca-cert"; }
        else if ( fileName.search(/^.*\.zoo$/) >= 0 ) {
            value_OUT = "application/x-zoo"; }
        else if ( fileName.search(/^.*\.xhtml$/) >= 0 ) {
            value_OUT = "application/xhtml+xml"; }
        else if ( fileName.search(/^.*\.zip$/) >= 0 ) {
            value_OUT = "application/zip"; }
        else if ( fileName.search(/^.*\.ac3$/) >= 0 ) {
            value_OUT = "audio/ac3"; }
        else if ( fileName.search(/^.*\.amr$/) >= 0 ) {
            value_OUT = "audio/AMR"; }
        else if ( fileName.search(/^.*\.awb$/) >= 0 ) {
            value_OUT = "audio/AMR-WB"; }
        else if ( fileName.search(/^.*\.au$/) >= 0 ) {
            value_OUT = "audio/basic"; }
        else if ( fileName.search(/^.*\.snd$/) >= 0 ) {
            value_OUT = "audio/basic"; }
        else if ( fileName.search(/^.*\.sid$/) >= 0 ) {
            value_OUT = "audio/prs.sid"; }
        else if ( fileName.search(/^.*\.psid$/) >= 0 ) {
            value_OUT = "audio/prs.sid"; }
        else if ( fileName.search(/^.*\.aiff$/) >= 0 ) {
            value_OUT = "audio/x-aiff"; }
        else if ( fileName.search(/^.*\.aif$/) >= 0 ) {
            value_OUT = "audio/x-aiff"; }
        else if ( fileName.search(/^.*\.aifc$/) >= 0 ) {
            value_OUT = "audio/x-aiff"; }
        else if ( fileName.search(/^.*\.ape$/) >= 0 ) {
            value_OUT = "audio/x-ape"; }
        else if ( fileName.search(/^.*\.it$/) >= 0 ) {
            value_OUT = "audio/x-it"; }
        else if ( fileName.search(/^.*\.flac$/) >= 0 ) {
            value_OUT = "audio/x-flac"; }
        else if ( fileName.search(/^.*\.wv$/) >= 0 ) {
            value_OUT = "audio/x-wavpack"; }
        else if ( fileName.search(/^.*\.wvp$/) >= 0 ) {
            value_OUT = "audio/x-wavpack"; }
        else if ( fileName.search(/^.*\.wvc$/) >= 0 ) {
            value_OUT = "audio/x-wavpack-correction"; }
        else if ( fileName.search(/^.*\.mid$/) >= 0 ) {
            value_OUT = "audio/midi"; }
        else if ( fileName.search(/^.*\.midi$/) >= 0 ) {
            value_OUT = "audio/midi"; }
        else if ( fileName.search(/^.*\.kar$/) >= 0 ) {
            value_OUT = "audio/midi"; }
        else if ( fileName.search(/^.*\.m4a$/) >= 0 ) {
            value_OUT = "audio/mp4"; }
        else if ( fileName.search(/^.*\.aac$/) >= 0 ) {
            value_OUT = "audio/mp4"; }
        else if ( fileName.search(/^.*\.mp4$/) >= 0 ) {
            value_OUT = "video/mp4"; }
        else if ( fileName.search(/^.*\.m4v$/) >= 0 ) {
            value_OUT = "video/mp4"; }
        else if ( fileName.search(/^.*\.m4b$/) >= 0 ) {
            value_OUT = "audio/x-m4b"; }
        else if ( fileName.search(/^.*\.3gp$/) >= 0 ) {
            value_OUT = "video/3gpp"; }
        else if ( fileName.search(/^.*\.3gpp$/) >= 0 ) {
            value_OUT = "video/3gpp"; }
        else if ( fileName.search(/^.*\.amr$/) >= 0 ) {
            value_OUT = "video/3gpp"; }
        else if ( fileName.search(/^.*\.mod$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.ult$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.uni$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.m15$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.mtm$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.669$/) >= 0 ) {
            value_OUT = "audio/x-mod"; }
        else if ( fileName.search(/^.*\.mp2$/) >= 0 ) {
            value_OUT = "audio/mp2"; }
        else if ( fileName.search(/^.*\.mp3$/) >= 0 ) {
            value_OUT = "audio/mpeg"; }
        else if ( fileName.search(/^.*\.mpga$/) >= 0 ) {
            value_OUT = "audio/mpeg"; }
        else if ( fileName.search(/^.*\.m3u$/) >= 0 ) {
            value_OUT = "audio/x-mpegurl"; }
        else if ( fileName.search(/^.*\.vlc$/) >= 0 ) {
            value_OUT = "audio/x-mpegurl"; }
        else if ( fileName.search(/^.*\.asx$/) >= 0 ) {
            value_OUT = "audio/x-ms-asx"; }
        else if ( fileName.search(/^.*\.wax$/) >= 0 ) {
            value_OUT = "audio/x-ms-asx"; }
        else if ( fileName.search(/^.*\.wvx$/) >= 0 ) {
            value_OUT = "audio/x-ms-asx"; }
        else if ( fileName.search(/^.*\.wmx$/) >= 0 ) {
            value_OUT = "audio/x-ms-asx"; }
        else if ( fileName.search(/^.*\.psf$/) >= 0 ) {
            value_OUT = "audio/x-psf"; }
        else if ( fileName.search(/^.*\.minipsf$/) >= 0 ) {
            value_OUT = "audio/x-minipsf"; }
        else if ( fileName.search(/^.*\.psflib$/) >= 0 ) {
            value_OUT = "audio/x-psflib"; }
        else if ( fileName.search(/^.*\.wma$/) >= 0 ) {
            value_OUT = "audio/x-ms-wma"; }
        else if ( fileName.search(/^.*\.mpc$/) >= 0 ) {
            value_OUT = "audio/x-musepack"; }
        else if ( fileName.search(/^.*\.mpp$/) >= 0 ) {
            value_OUT = "audio/x-musepack"; }
        else if ( fileName.search(/^.*\.mp[+]$/) >= 0 ) {
            value_OUT = "audio/x-musepack"; }
        else if ( fileName.search(/^.*\.ra$/) >= 0 ) {
            value_OUT = "audio/vnd.rn-realaudio"; }
        else if ( fileName.search(/^.*\.rax$/) >= 0 ) {
            value_OUT = "audio/vnd.rn-realaudio"; }
        else if ( fileName.search(/^.*\.ram$/) >= 0 ) {
            value_OUT = "application/ram"; }
        else if ( fileName.search(/^.*\.rv$/) >= 0 ) {
            value_OUT = "video/vnd.rn-realvideo"; }
        else if ( fileName.search(/^.*\.rvx$/) >= 0 ) {
            value_OUT = "video/vnd.rn-realvideo"; }
        else if ( fileName.search(/^.*\.rm$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rmj$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rmm$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rms$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rmx$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rmvb$/) >= 0 ) {
            value_OUT = "application/vnd.rn-realmedia"; }
        else if ( fileName.search(/^.*\.rp$/) >= 0 ) {
            value_OUT = "image/vnd.rn-realpix"; }
        else if ( fileName.search(/^.*\.rt$/) >= 0 ) {
            value_OUT = "text/vnd.rn-realtext"; }
        else if ( fileName.search(/^.*\.s3m$/) >= 0 ) {
            value_OUT = "audio/x-s3m"; }
        else if ( fileName.search(/^.*\.pls$/) >= 0 ) {
            value_OUT = "audio/x-scpls"; }
        else if ( fileName.search(/^.*\.stm$/) >= 0 ) {
            value_OUT = "audio/x-stm"; }
        else if ( fileName.search(/^.*\.voc$/) >= 0 ) {
            value_OUT = "audio/x-voc"; }
        else if ( fileName.search(/^.*\.wav$/) >= 0 ) {
            value_OUT = "audio/x-wav"; }
        else if ( fileName.search(/^.*\.xi$/) >= 0 ) {
            value_OUT = "audio/x-xi"; }
        else if ( fileName.search(/^.*\.xm$/) >= 0 ) {
            value_OUT = "audio/x-xm"; }
        else if ( fileName.search(/^.*\.tta$/) >= 0 ) {
            value_OUT = "audio/x-tta"; }
        else if ( fileName.search(/^.*\.bmp$/) >= 0 ) {
            value_OUT = "image/bmp"; }
        else if ( fileName.search(/^.*\.wbmp$/) >= 0 ) {
            value_OUT = "image/vnd.wap.wbmp"; }
        else if ( fileName.search(/^.*\.cgm$/) >= 0 ) {
            value_OUT = "image/cgm"; }
        else if ( fileName.search(/^.*\.g3$/) >= 0 ) {
            value_OUT = "image/fax-g3"; }
        else if ( fileName.search(/^.*\.gif$/) >= 0 ) {
            value_OUT = "image/gif"; }
        else if ( fileName.search(/^.*\.ief$/) >= 0 ) {
            value_OUT = "image/ief"; }
        else if ( fileName.search(/^.*\.jpeg$/) >= 0 ) {
            value_OUT = "image/jpeg"; }
        else if ( fileName.search(/^.*\.jpg$/) >= 0 ) {
            value_OUT = "image/jpeg"; }
        else if ( fileName.search(/^.*\.jpe$/) >= 0 ) {
            value_OUT = "image/jpeg"; }
        else if ( fileName.search(/^.*\.jp2$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.jpc$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.jpx$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.j2k$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.jpf$/) >= 0 ) {
            value_OUT = "image/jp2"; }
        else if ( fileName.search(/^.*\.dds$/) >= 0 ) {
            value_OUT = "image/x-dds"; }
        else if ( fileName.search(/^.*\.pict$/) >= 0 ) {
            value_OUT = "image/x-pict"; }
        else if ( fileName.search(/^.*\.pict1$/) >= 0 ) {
            value_OUT = "image/x-pict"; }
        else if ( fileName.search(/^.*\.pict2$/) >= 0 ) {
            value_OUT = "image/x-pict"; }
        else if ( fileName.search(/^.*\.ufraw$/) >= 0 ) {
            value_OUT = "application/x-ufraw"; }
        else if ( fileName.search(/^.*\.dng$/) >= 0 ) {
            value_OUT = "image/x-adobe-dng"; }
        else if ( fileName.search(/^.*\.crw$/) >= 0 ) {
            value_OUT = "image/x-canon-crw"; }
        else if ( fileName.search(/^.*\.cr2$/) >= 0 ) {
            value_OUT = "image/x-canon-cr2"; }
        else if ( fileName.search(/^.*\.raf$/) >= 0 ) {
            value_OUT = "image/x-fuji-raf"; }
        else if ( fileName.search(/^.*\.dcr$/) >= 0 ) {
            value_OUT = "image/x-kodak-dcr"; }
        else if ( fileName.search(/^.*\.k25$/) >= 0 ) {
            value_OUT = "image/x-kodak-k25"; }
        else if ( fileName.search(/^.*\.kdc$/) >= 0 ) {
            value_OUT = "image/x-kodak-kdc"; }
        else if ( fileName.search(/^.*\.mrw$/) >= 0 ) {
            value_OUT = "image/x-minolta-mrw"; }
        else if ( fileName.search(/^.*\.nef$/) >= 0 ) {
            value_OUT = "image/x-nikon-nef"; }
        else if ( fileName.search(/^.*\.orf$/) >= 0 ) {
            value_OUT = "image/x-olympus-orf"; }
        else if ( fileName.search(/^.*\.raw$/) >= 0 ) {
            value_OUT = "image/x-panasonic-raw"; }
        else if ( fileName.search(/^.*\.pef$/) >= 0 ) {
            value_OUT = "image/x-pentax-pef"; }
        else if ( fileName.search(/^.*\.x3f$/) >= 0 ) {
            value_OUT = "image/x-sigma-x3f"; }
        else if ( fileName.search(/^.*\.srf$/) >= 0 ) {
            value_OUT = "image/x-sony-srf"; }
        else if ( fileName.search(/^.*\.sr2$/) >= 0 ) {
            value_OUT = "image/x-sony-sr2"; }
        else if ( fileName.search(/^.*\.arw$/) >= 0 ) {
            value_OUT = "image/x-sony-arw"; }
        else if ( fileName.search(/^.*\.png$/) >= 0 ) {
            value_OUT = "image/png"; }
        else if ( fileName.search(/^.*\.rle$/) >= 0 ) {
            value_OUT = "image/rle"; }
        else if ( fileName.search(/^.*\.svg$/) >= 0 ) {
            value_OUT = "image/svg+xml"; }
        else if ( fileName.search(/^.*\.svgz$/) >= 0 ) {
            value_OUT = "image/svg+xml-compressed"; }
        else if ( fileName.search(/^.*\.tif$/) >= 0 ) {
            value_OUT = "image/tiff"; }
        else if ( fileName.search(/^.*\.tiff$/) >= 0 ) {
            value_OUT = "image/tiff"; }
        else if ( fileName.search(/^.*\.dwg$/) >= 0 ) {
            value_OUT = "image/vnd.dwg"; }
        else if ( fileName.search(/^.*\.dxf$/) >= 0 ) {
            value_OUT = "image/vnd.dxf"; }
        else if ( fileName.search(/^.*\.3ds$/) >= 0 ) {
            value_OUT = "image/x-3ds"; }
        else if ( fileName.search(/^.*\.ag$/) >= 0 ) {
            value_OUT = "image/x-applix-graphics"; }
        else if ( fileName.search(/^.*\.eps\.bz2$/) >= 0 ) {
            value_OUT = "image/x-bzeps"; }
        else if ( fileName.search(/^.*\.epsi\.bz2$/) >= 0 ) {
            value_OUT = "image/x-bzeps"; }
        else if ( fileName.search(/^.*\.epsf\.bz2$/) >= 0 ) {
            value_OUT = "image/x-bzeps"; }
        else if ( fileName.search(/^.*\.ras$/) >= 0 ) {
            value_OUT = "image/x-cmu-raster"; }
        else if ( fileName.search(/^.*\.xcf\.gz$/) >= 0 ) {
            value_OUT = "image/x-compressed-xcf"; }
        else if ( fileName.search(/^.*\.xcf\.bz2$/) >= 0 ) {
            value_OUT = "image/x-compressed-xcf"; }
        else if ( fileName.search(/^.*\.dcm$/) >= 0 ) {
            value_OUT = "application/dicom"; }
        else if ( fileName.search(/^.*\.docbook$/) >= 0 ) {
            value_OUT = "application/docbook+xml"; }
        else if ( fileName.search(/^.*\.djvu$/) >= 0 ) {
            value_OUT = "image/vnd.djvu"; }
        else if ( fileName.search(/^.*\.djv$/) >= 0 ) {
            value_OUT = "image/vnd.djvu"; }
        else if ( fileName.search(/^.*\.eps$/) >= 0 ) {
            value_OUT = "image/x-eps"; }
        else if ( fileName.search(/^.*\.epsi$/) >= 0 ) {
            value_OUT = "image/x-eps"; }
        else if ( fileName.search(/^.*\.epsf$/) >= 0 ) {
            value_OUT = "image/x-eps"; }
        else if ( fileName.search(/^.*\.fits$/) >= 0 ) {
            value_OUT = "image/x-fits"; }
        else if ( fileName.search(/^.*\.eps\.gz$/) >= 0 ) {
            value_OUT = "image/x-gzeps"; }
        else if ( fileName.search(/^.*\.epsi\.gz$/) >= 0 ) {
            value_OUT = "image/x-gzeps"; }
        else if ( fileName.search(/^.*\.epsf\.gz$/) >= 0 ) {
            value_OUT = "image/x-gzeps"; }
        else if ( fileName.search(/^.*\.ico$/) >= 0 ) {
            value_OUT = "image/x-ico"; }
        else if ( fileName.search(/^.*\.icns$/) >= 0 ) {
            value_OUT = "image/x-icns"; }
        else if ( fileName.search(/^.*\.iff$/) >= 0 ) {
            value_OUT = "image/x-iff"; }
        else if ( fileName.search(/^.*\.ilbm$/) >= 0 ) {
            value_OUT = "image/x-ilbm"; }
        else if ( fileName.search(/^.*\.jng$/) >= 0 ) {
            value_OUT = "image/x-jng"; }
        else if ( fileName.search(/^.*\.lwo$/) >= 0 ) {
            value_OUT = "image/x-lwo"; }
        else if ( fileName.search(/^.*\.lwob$/) >= 0 ) {
            value_OUT = "image/x-lwo"; }
        else if ( fileName.search(/^.*\.lws$/) >= 0 ) {
            value_OUT = "image/x-lws"; }
        else if ( fileName.search(/^.*\.pntg$/) >= 0 ) {
            value_OUT = "image/x-macpaint"; }
        else if ( fileName.search(/^.*\.msod$/) >= 0 ) {
            value_OUT = "image/x-msod"; }
        else if ( fileName.search(/^.*\.pcd$/) >= 0 ) {
            value_OUT = "image/x-photo-cd"; }
        else if ( fileName.search(/^.*\.pnm$/) >= 0 ) {
            value_OUT = "image/x-portable-anymap"; }
        else if ( fileName.search(/^.*\.pbm$/) >= 0 ) {
            value_OUT = "image/x-portable-bitmap"; }
        else if ( fileName.search(/^.*\.pgm$/) >= 0 ) {
            value_OUT = "image/x-portable-graymap"; }
        else if ( fileName.search(/^.*\.ppm$/) >= 0 ) {
            value_OUT = "image/x-portable-pixmap"; }
        else if ( fileName.search(/^.*\.psd$/) >= 0 ) {
            value_OUT = "image/x-psd"; }
        else if ( fileName.search(/^.*\.rgb$/) >= 0 ) {
            value_OUT = "image/x-rgb"; }
        else if ( fileName.search(/^.*\.sgi$/) >= 0 ) {
            value_OUT = "image/x-sgi"; }
        else if ( fileName.search(/^.*\.sun$/) >= 0 ) {
            value_OUT = "image/x-sun-raster"; }
        else if ( fileName.search(/^.*\.icb$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.tga$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.tpic$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.vda$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.vst$/) >= 0 ) {
            value_OUT = "image/x-tga"; }
        else if ( fileName.search(/^.*\.cur$/) >= 0 ) {
            value_OUT = "image/x-win-bitmap"; }
        else if ( fileName.search(/^.*\.emf$/) >= 0 ) {
            value_OUT = "image/x-emf"; }
        else if ( fileName.search(/^.*\.wmf$/) >= 0 ) {
            value_OUT = "image/x-wmf"; }
        else if ( fileName.search(/^.*\.xbm$/) >= 0 ) {
            value_OUT = "image/x-xbitmap"; }
        else if ( fileName.search(/^.*\.xcf$/) >= 0 ) {
            value_OUT = "image/x-xcf"; }
        else if ( fileName.search(/^.*\.fig$/) >= 0 ) {
            value_OUT = "image/x-xfig"; }
        else if ( fileName.search(/^.*\.xpm$/) >= 0 ) {
            value_OUT = "image/x-xpixmap"; }
        else if ( fileName.search(/^.*\.xwd$/) >= 0 ) {
            value_OUT = "image/x-xwindowdump"; }
        else if ( fileName.search(/^RMAIL$/) >= 0 ) {
            value_OUT = "message/x-gnu-rmail"; }
        else if ( fileName.search(/^.*\.wrl$/) >= 0 ) {
            value_OUT = "model/vrml"; }
        else if ( fileName.search(/^.*\.vcs$/) >= 0 ) {
            value_OUT = "text/calendar"; }
        else if ( fileName.search(/^.*\.ics$/) >= 0 ) {
            value_OUT = "text/calendar"; }
        else if ( fileName.search(/^.*\.css$/) >= 0 ) {
            value_OUT = "text/css"; }
        else if ( fileName.search(/^.*\.CSSL$/) >= 0 ) {
            value_OUT = "text/css"; }
        else if ( fileName.search(/^.*\.vcf$/) >= 0 ) {
            value_OUT = "text/directory"; }
        else if ( fileName.search(/^.*\.vct$/) >= 0 ) {
            value_OUT = "text/directory"; }
        else if ( fileName.search(/^.*\.gcrd$/) >= 0 ) {
            value_OUT = "text/directory"; }
        else if ( fileName.search(/^.*\.t2t$/) >= 0 ) {
            value_OUT = "text/x-txt2tags"; }
        else if ( fileName.search(/^.*\.vhd$/) >= 0 ) {
            value_OUT = "text/x-vhdl"; }
        else if ( fileName.search(/^.*\.vhdl$/) >= 0 ) {
            value_OUT = "text/x-vhdl"; }
        else if ( fileName.search(/^.*\.mml$/) >= 0 ) {
            value_OUT = "text/mathml"; }
        else if ( fileName.search(/^.*\.txt$/) >= 0 ) {
            value_OUT = "text/plain"; }
        else if ( fileName.search(/^.*\.asc$/) >= 0 ) {
            value_OUT = "text/plain"; }
        else if ( fileName.search(/^.*\.rdf$/) >= 0 ) {
            value_OUT = "text/rdf"; }
        else if ( fileName.search(/^.*\.rdfs$/) >= 0 ) {
            value_OUT = "text/rdf"; }
        else if ( fileName.search(/^.*\.owl$/) >= 0 ) {
            value_OUT = "text/rdf"; }
        else if ( fileName.search(/^.*\.rtx$/) >= 0 ) {
            value_OUT = "text/richtext"; }
        else if ( fileName.search(/^.*\.rss$/) >= 0 ) {
            value_OUT = "application/rss+xml"; }
        else if ( fileName.search(/^.*\.atom$/) >= 0 ) {
            value_OUT = "application/atom+xml"; }
        else if ( fileName.search(/^.*\.opml$/) >= 0 ) {
            value_OUT = "text/x-opml+xml"; }
        else if ( fileName.search(/^.*\.sgml$/) >= 0 ) {
            value_OUT = "text/sgml"; }
        else if ( fileName.search(/^.*\.sgm$/) >= 0 ) {
            value_OUT = "text/sgml"; }
        else if ( fileName.search(/^.*\.sylk$/) >= 0 ) {
            value_OUT = "text/spreadsheet"; }
        else if ( fileName.search(/^.*\.slk$/) >= 0 ) {
            value_OUT = "text/spreadsheet"; }
        else if ( fileName.search(/^.*\.tsv$/) >= 0 ) {
            value_OUT = "text/tab-separated-values"; }
        else if ( fileName.search(/^.*\.jad$/) >= 0 ) {
            value_OUT = "text/vnd.sun.j2me.app-descriptor"; }
        else if ( fileName.search(/^.*\.wml$/) >= 0 ) {
            value_OUT = "text/vnd.wap.wml"; }
        else if ( fileName.search(/^.*\.wmls$/) >= 0 ) {
            value_OUT = "text/vnd.wap.wmlscript"; }
        else if ( fileName.search(/^.*\.ace$/) >= 0 ) {
            value_OUT = "application/x-ace"; }
        else if ( fileName.search(/^.*\.adb$/) >= 0 ) {
            value_OUT = "text/x-adasrc"; }
        else if ( fileName.search(/^.*\.ads$/) >= 0 ) {
            value_OUT = "text/x-adasrc"; }
        else if ( fileName.search(/^AUTHORS$/) >= 0 ) {
            value_OUT = "text/x-authors"; }
        else if ( fileName.search(/^.*\.bib$/) >= 0 ) {
            value_OUT = "text/x-bibtex"; }
        else if ( fileName.search(/^.*\.hh$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.hp$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.hpp$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.h[+][+]$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.hxx$/) >= 0 ) {
            value_OUT = "text/x-c++hdr"; }
        else if ( fileName.search(/^.*\.cpp$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^.*\.cxx$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^.*\.cc$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^.*\.C$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^.*\.c[+][+]$/) >= 0 ) {
            value_OUT = "text/x-c++src"; }
        else if ( fileName.search(/^ChangeLog$/) >= 0 ) {
            value_OUT = "text/x-changelog"; }
        else if ( fileName.search(/^.*\.h$/) >= 0 ) {
            value_OUT = "text/x-chdr"; }
        else if ( fileName.search(/^.*\.csv$/) >= 0 ) {
            value_OUT = "text/csv"; }
        else if ( fileName.search(/^COPYING$/) >= 0 ) {
            value_OUT = "text/x-copying"; }
        else if ( fileName.search(/^CREDITS$/) >= 0 ) {
            value_OUT = "text/x-credits"; }
        else if ( fileName.search(/^.*\.c$/) >= 0 ) {
            value_OUT = "text/x-csrc"; }
        else if ( fileName.search(/^.*\.cs$/) >= 0 ) {
            value_OUT = "text/x-csharp"; }
        else if ( fileName.search(/^.*\.vala$/) >= 0 ) {
            value_OUT = "text/x-vala"; }
        else if ( fileName.search(/^.*\.dcl$/) >= 0 ) {
            value_OUT = "text/x-dcl"; }
        else if ( fileName.search(/^.*\.dsl$/) >= 0 ) {
            value_OUT = "text/x-dsl"; }
        else if ( fileName.search(/^.*\.d$/) >= 0 ) {
            value_OUT = "text/x-dsrc"; }
        else if ( fileName.search(/^.*\.dtd$/) >= 0 ) {
            value_OUT = "text/x-dtd"; }
        else if ( fileName.search(/^.*\.el$/) >= 0 ) {
            value_OUT = "text/x-emacs-lisp"; }
        else if ( fileName.search(/^.*\.erl$/) >= 0 ) {
            value_OUT = "text/x-erlang"; }
        else if ( fileName.search(/^.*\.[fF]$/) >= 0 ) {
            value_OUT = "text/x-fortran"; }
        else if ( fileName.search(/^.*\.[fF]9[05]$/) >= 0 ) {
            value_OUT = "text/x-fortran"; }
        else if ( fileName.search(/^.*\.for$/) >= 0 ) {
            value_OUT = "text/x-fortran"; }
        else if ( fileName.search(/^.*\.po$/) >= 0 ) {
            value_OUT = "text/x-gettext-translation"; }
        else if ( fileName.search(/^.*\.pot$/) >= 0 ) {
            value_OUT = "text/x-gettext-translation-template"; }
        else if ( fileName.search(/^.*\.html$/) >= 0 ) {
            value_OUT = "text/html"; }
        else if ( fileName.search(/^.*\.htm$/) >= 0 ) {
            value_OUT = "text/html"; }
        else if ( fileName.search(/^gtkrc$/) >= 0 ) {
            value_OUT = "text/x-gtkrc"; }
        else if ( fileName.search(/^\.gtkrc$/) >= 0 ) {
            value_OUT = "text/x-gtkrc"; }
        else if ( fileName.search(/^.*\.gvp$/) >= 0 ) {
            value_OUT = "text/x-google-video-pointer"; }
        else if ( fileName.search(/^.*\.hs$/) >= 0 ) {
            value_OUT = "text/x-haskell"; }
        else if ( fileName.search(/^.*\.idl$/) >= 0 ) {
            value_OUT = "text/x-idl"; }
        else if ( fileName.search(/^INSTALL$/) >= 0 ) {
            value_OUT = "text/x-install"; }
        else if ( fileName.search(/^.*\.java$/) >= 0 ) {
            value_OUT = "text/x-java"; }
        else if ( fileName.search(/^.*\.ldif$/) >= 0 ) {
            value_OUT = "text/x-ldif"; }
        else if ( fileName.search(/^.*\.lhs$/) >= 0 ) {
            value_OUT = "text/x-literate-haskell"; }
        else if ( fileName.search(/^.*\.log$/) >= 0 ) {
            value_OUT = "text/x-log"; }
        else if ( fileName.search(/^[Mm]akefile$/) >= 0 ) {
            value_OUT = "text/x-makefile"; }
        else if ( fileName.search(/^GNUmakefile$/) >= 0 ) {
            value_OUT = "text/x-makefile"; }
        else if ( fileName.search(/^.*\.moc$/) >= 0 ) {
            value_OUT = "text/x-moc"; }
        else if ( fileName.search(/^.*\.mup$/) >= 0 ) {
            value_OUT = "text/x-mup"; }
        else if ( fileName.search(/^.*\.not$/) >= 0 ) {
            value_OUT = "text/x-mup"; }
        else if ( fileName.search(/^.*\.m$/) >= 0 ) {
            value_OUT = "text/x-objcsrc"; }
        else if ( fileName.search(/^.*\.ml$/) >= 0 ) {
            value_OUT = "text/x-ocaml"; }
        else if ( fileName.search(/^.*\.mli$/) >= 0 ) {
            value_OUT = "text/x-ocaml"; }
        else if ( fileName.search(/^.*\.m$/) >= 0 ) {
            value_OUT = "text/x-matlab"; }
        else if ( fileName.search(/^.*\.p$/) >= 0 ) {
            value_OUT = "text/x-pascal"; }
        else if ( fileName.search(/^.*\.pas$/) >= 0 ) {
            value_OUT = "text/x-pascal"; }
        else if ( fileName.search(/^.*\.diff$/) >= 0 ) {
            value_OUT = "text/x-patch"; }
        else if ( fileName.search(/^.*\.patch$/) >= 0 ) {
            value_OUT = "text/x-patch"; }
        else if ( fileName.search(/^.*\.py$/) >= 0 ) {
            value_OUT = "text/x-python"; }
        else if ( fileName.search(/^.*\.lua$/) >= 0 ) {
            value_OUT = "text/x-lua"; }
        else if ( fileName.search(/^README*$/) >= 0 ) {
            value_OUT = "text/x-readme"; }
        else if ( fileName.search(/^.*\.nfo$/) >= 0 ) {
            value_OUT = "text/x-readme"; }
        else if ( fileName.search(/^.*\.spec$/) >= 0 ) {
            value_OUT = "text/x-rpm-spec"; }
        else if ( fileName.search(/^.*\.scm$/) >= 0 ) {
            value_OUT = "text/x-scheme"; }
        else if ( fileName.search(/^.*\.etx$/) >= 0 ) {
            value_OUT = "text/x-setext"; }
        else if ( fileName.search(/^.*\.sql$/) >= 0 ) {
            value_OUT = "text/x-sql"; }
        else if ( fileName.search(/^.*\.tcl$/) >= 0 ) {
            value_OUT = "text/x-tcl"; }
        else if ( fileName.search(/^.*\.tk$/) >= 0 ) {
            value_OUT = "text/x-tcl"; }
        else if ( fileName.search(/^.*\.tex$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.ltx$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.sty$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.cls$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.dtx$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.ins$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.latex$/) >= 0 ) {
            value_OUT = "text/x-tex"; }
        else if ( fileName.search(/^.*\.texi$/) >= 0 ) {
            value_OUT = "text/x-texinfo"; }
        else if ( fileName.search(/^.*\.texinfo$/) >= 0 ) {
            value_OUT = "text/x-texinfo"; }
        else if ( fileName.search(/^.*\.me$/) >= 0 ) {
            value_OUT = "text/x-troff-me"; }
        else if ( fileName.search(/^.*\.mm$/) >= 0 ) {
            value_OUT = "text/x-troff-mm"; }
        else if ( fileName.search(/^.*\.ms$/) >= 0 ) {
            value_OUT = "text/x-troff-ms"; }
        else if ( fileName.search(/^.*\.uil$/) >= 0 ) {
            value_OUT = "text/x-uil"; }
        else if ( fileName.search(/^.*\.uri$/) >= 0 ) {
            value_OUT = "text/x-uri"; }
        else if ( fileName.search(/^.*\.url$/) >= 0 ) {
            value_OUT = "text/x-uri"; }
        else if ( fileName.search(/^.*\.xmi$/) >= 0 ) {
            value_OUT = "text/x-xmi"; }
        else if ( fileName.search(/^.*\.fo$/) >= 0 ) {
            value_OUT = "text/x-xslfo"; }
        else if ( fileName.search(/^.*\.xslfo$/) >= 0 ) {
            value_OUT = "text/x-xslfo"; }
        else if ( fileName.search(/^.*\.xml$/) >= 0 ) {
            value_OUT = "application/xml"; }
        else if ( fileName.search(/^.*\.xsl$/) >= 0 ) {
            value_OUT = "application/xml"; }
        else if ( fileName.search(/^.*\.xslt$/) >= 0 ) {
            value_OUT = "application/xml"; }
        else if ( fileName.search(/^.*\.xbl$/) >= 0 ) {
            value_OUT = "application/xml"; }
        else if ( fileName.search(/^.*\.dv$/) >= 0 ) {
            value_OUT = "video/dv"; }
        else if ( fileName.search(/^.*\.mpeg$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.mpg$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.mp2$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.mpe$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.vob$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.m2t$/) >= 0 ) {
            value_OUT = "video/mpeg"; }
        else if ( fileName.search(/^.*\.qt$/) >= 0 ) {
            value_OUT = "video/quicktime"; }
        else if ( fileName.search(/^.*\.mov$/) >= 0 ) {
            value_OUT = "video/quicktime"; }
        else if ( fileName.search(/^.*\.moov$/) >= 0 ) {
            value_OUT = "video/quicktime"; }
        else if ( fileName.search(/^.*\.qtvr$/) >= 0 ) {
            value_OUT = "video/quicktime"; }
        else if ( fileName.search(/^.*\.qtif$/) >= 0 ) {
            value_OUT = "image/x-quicktime"; }
        else if ( fileName.search(/^.*\.qif$/) >= 0 ) {
            value_OUT = "image/x-quicktime"; }
        else if ( fileName.search(/^.*\.viv$/) >= 0 ) {
            value_OUT = "video/vivo"; }
        else if ( fileName.search(/^.*\.vivo$/) >= 0 ) {
            value_OUT = "video/vivo"; }
        else if ( fileName.search(/^.*\.anim[1-9j]$/) >= 0 ) {
            value_OUT = "video/x-anim"; }
        else if ( fileName.search(/^.*\.fli$/) >= 0 ) {
            value_OUT = "video/x-flic"; }
        else if ( fileName.search(/^.*\.flc$/) >= 0 ) {
            value_OUT = "video/x-flic"; }
        else if ( fileName.search(/^.*\.hwp$/) >= 0 ) {
            value_OUT = "application/x-hwp"; }
        else if ( fileName.search(/^.*\.hwt$/) >= 0 ) {
            value_OUT = "application/x-hwt"; }
        else if ( fileName.search(/^.*\.mng$/) >= 0 ) {
            value_OUT = "video/x-mng"; }
        else if ( fileName.search(/^.*\.asf$/) >= 0 ) {
            value_OUT = "video/x-ms-asf"; }
        else if ( fileName.search(/^.*\.nsc$/) >= 0 ) {
            value_OUT = "application/x-netshow-channel"; }
        else if ( fileName.search(/^.*\.wmv$/) >= 0 ) {
            value_OUT = "video/x-ms-wmv"; }
        else if ( fileName.search(/^.*\.avi$/) >= 0 ) {
            value_OUT = "video/x-msvideo"; }
        else if ( fileName.search(/^.*\.divx$/) >= 0 ) {
            value_OUT = "video/x-msvideo"; }
        else if ( fileName.search(/^.*\.nsv$/) >= 0 ) {
            value_OUT = "video/x-nsv"; }
        else if ( fileName.search(/^.*\.sdp$/) >= 0 ) {
            value_OUT = "application/sdp"; }
        else if ( fileName.search(/^.*\.movie$/) >= 0 ) {
            value_OUT = "video/x-sgi-movie"; }
        else if ( fileName.search(/^.*\.emp$/) >= 0 ) {
            value_OUT = "application/vnd.emusic-emusic_package"; }
        else if ( fileName.search(/^.*\.ica$/) >= 0 ) {
            value_OUT = "application/x-ica"; }
        else if ( fileName.search(/^.*\.xul$/) >= 0 ) {
            value_OUT = "application/vnd.mozilla.xul+xml"; }
        else if ( fileName.search(/^.*\.602$/) >= 0 ) {
            value_OUT = "application/x-t602";
        }

	}
		
	return value_OUT;

} //-- END function getMIMEType() --//
*/