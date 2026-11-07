import asyncio, sys
from playwright.async_api import async_playwright

L = {
"en": dict(
 title="Biomedical Engineer · M.Sc. Computer Science student",
 location="St. John’s, NL, Canada",
 profile_h="Profile",
 profile="Biomedical Engineer (UDLAP, <i>summa cum laude</i>) and fully funded M.Sc. Computer Science student at Memorial University of Newfoundland. My research combines instrumentation, biomechanics and computing, with a focus on insect-based biorobotics: I built a controlled-environment treadmill platform to study the locomotion of the Madagascar hissing cockroach, published as an <b>Editor’s Choice</b> article in <i>Biology</i> (MDPI, Q1). I also develop software with JavaScript/Node.js, MongoDB and Python.",
 edu_h="Education",
 edu=[("Sep 2026 – present","M.Sc. Computer Science","Memorial University of Newfoundland, St. John’s, Canada","Fully funded scholarship. Co-supervised by Dr. Oscar Meruvia Pastor and Dr. Jay Henderson. Coursework: Algorithms (COMP 6901), Software Engineering (COMP 6905)."),
      ("2022 – 2026","B.Sc. Biomedical Engineering — <i>summa cum laude</i>","Universidad de las Américas Puebla (UDLAP), Puebla, Mexico","Member of the UDLAP Honors Program since 2023.")],
 pub_h="Publications",
 art_h="Journal article",
 art='<b>Gracidas-Reyes, E.</b>; Díaz-Arango, G.; Vázquez-Leal, H.; Marroquín-Gutiérrez, F. (2026). Temperature-Dependent Tethered Locomotion Behavior in the Madagascar Hissing Cockroach Using a Controlled-Environment Treadmill Platform with Exploratory Illumination Assays. <i>Biology</i>, 15(12), 947. doi:10.3390/biology15120947. <span class="tag">Editor’s Choice</span> <span class="tag">Q1 · IF 4.3</span>',
 ch_h="Book chapters",
 ch=["<i>Advances in the Design and Control of Cyborg Hissing Cockroaches: Machine Learning, Motion Tracking, and Temperature Control with a Perspective on Search and Rescue Operations.</i>",
     "<i>Adquisición de datos para el análisis de la locomoción de Gromphadorhina portentosa bajo distintas condiciones térmicas.</i>"],
 res_h="Research experience",
 res=[("Sep 2025 – Mar 2026","Social service — INAOE, Electronics area","Instituto Nacional de Astrofísica, Óptica y Electrónica, Puebla, Mexico",
        ["Characterization of <i>Gromphadorhina portentosa</i> under environmental and electrical stimuli for its use as a biorobotic system.","Design and implementation of a controlled environment for temperature and light."]),
      ("May – Aug 2025","Professional practices — INAOE, Electronics area","Under the direction of Dr. Luis Hernández Martínez",
        ["Adapted specimens to controlled experimental conditions.","Implemented an experimental environment with programmable temperature, humidity and light; results published in <i>Biology</i>."]),
      ("Ongoing","Cyborg Insects Initiative (C2I)","Insect-based biorobotics",
        ["Machine learning for stimulating cyborg cockroaches while avoiding habituation.","Webcam + QR-code videogrammetry for motion tracking without heavy electronic backpacks.","Characterization of stimulation parameters for efficient movement control."])],
 proj_h="Selected projects",
 proj=[("Semi-portable Smart Pillbox for polypharmacy patients","21-compartment automatic dispenser, audiovisual alarms, TFT display and a cross-platform mobile app (SmartDose)."),
       ("IoMT system for surgery and remote monitoring","Control interface with live video and remote ECG for surgical support and remote follow-up."),
       ("Feature extraction for Parkinson disease diagnosis","Physiological-signal processing to extract features supporting clinical diagnosis."),
       ("3D reconstruction of CT images","Volumetric reconstruction of CT slices with axial, coronal and sagittal views."),
       ("Stock-trading simulation (COMP 6905)","Team-based software engineering project at Memorial University.")],
 aw_h="Honours & awards",
 aw=[("2026","Editor’s Choice article — <i>Biology</i> (MDPI)"),("2026","Fully funded M.Sc. scholarship — Memorial University of Newfoundland"),("2026","<i>Summa cum laude</i> — B.Sc. Biomedical Engineering, UDLAP"),
     ("2025","3rd place — Silldromo 2025, biomedical applications from biosignals, INAOE"),("2025","1st place, Junior category — Expo CEM 2.0, UDLAP"),
     ("2025","Winner — IICNNCD, cyborg-cockroach data acquisition and statistical modelling"),("—","2nd place, poster competition — II Congreso Nacional de Ciencia de Datos"),
     ("2026","Recognition — Colegio Ángeles"),("2023","Member — UDLAP Honors Program")],
 conf_h="Conferences & presentations",
 conf=["International Conference on Ontologies and Knowledge Graphs (ICOKG 2025), BUAP — presenter",
       "Congreso Nacional de Ingeniería Biomédica (CNIB 2025), SOMIB — poster “Sistema de análisis biomecánico”",
       "7ª Jornada de Mujeres en la Ciencia, BUAP (2025) — poster “Sistema de monitoreo de señales biomecánicas”",
       "II Congreso del Programa de Honores, UDLAP — panelist",
       "Expo CEM 3.0 (Fall 2025), Expo CEM 2.0 (Spring 2025) and Expo CEM (Fall 2024), UDLAP"],
 cert_h="Certifications & courses",
 cert=["Focus on Peer Review — Nature Masterclasses (2025)","AI in Global Health Research, MSC1125H — University of Toronto (2025)",
       "Startups in the Medical Sciences, MSC1122H — University of Toronto (2025)","Wearable Sensors for Cardiorespiratory Monitoring — IEEE (2025)",
       "Bachelor’s Master Classes — Boston Scientific (2025)","Diploma in Neurolearning, 100 h — Universidad Anáhuac Puebla (2025)",
       "AI in Medicine, MSC1114H — University of Toronto (2023)","Microsoft Office Specialist: Excel 2016 (2018)"],
 sk_h="Skills",
 sk=[("Software","JavaScript, Node.js, Express, ViteExpress, REST APIs, OpenAPI, JSDoc, automated testing, HTML/CSS, software architecture"),
     ("Data","MongoDB Atlas (native driver), Plotly.js, data visualization, market-data APIs"),
     ("Scientific","Python, Jupyter, signal processing, mixed-effects models, non-parametric statistics, computer vision, machine learning"),
     ("Biomedical","Instrumentation, embedded systems, microcontrollers, biosignal acquisition, thermal imaging, environmental control"),
     ("Tools","Git, GitHub, scientific writing, peer review")],
 lang_h="Languages", langs="Spanish (native) · English (professional working)",
 int_h="Interests", ints="Photography (Canon EOS R50) · strategy games · reading · music",
 updated="Updated November 2026",
),
"es": dict(
 title="Ingeniero Biomédico · Estudiante de Maestría en Ciencias de la Computación",
 location="St. John’s, NL, Canadá",
 profile_h="Perfil",
 profile="Ingeniero Biomédico (UDLAP, <i>summa cum laude</i>) y estudiante becado de la Maestría en Ciencias de la Computación en Memorial University of Newfoundland. Mi investigación combina instrumentación, biomecánica y computación, con énfasis en la biorrobótica basada en insectos: construí una plataforma con ambiente controlado para estudiar la locomoción de la cucaracha silbadora de Madagascar, publicada como artículo <b>Editor’s Choice</b> en <i>Biology</i> (MDPI, Q1). También desarrollo software con JavaScript/Node.js, MongoDB y Python.",
 edu_h="Formación académica",
 edu=[("Sep 2026 – actualidad","Maestría en Ciencias de la Computación","Memorial University of Newfoundland, St. John’s, Canadá","Beca completa. Co-supervisión: Dr. Oscar Meruvia Pastor y Dr. Jay Henderson. Cursos: Algoritmos (COMP 6901), Ingeniería de Software (COMP 6905)."),
      ("2022 – 2026","Licenciatura en Ingeniería Biomédica — <i>summa cum laude</i>","Universidad de las Américas Puebla (UDLAP), Puebla, México","Miembro del Programa de Honores de la UDLAP desde 2023.")],
 pub_h="Publicaciones",
 art_h="Artículo en revista",
 art='<b>Gracidas-Reyes, E.</b>; Díaz-Arango, G.; Vázquez-Leal, H.; Marroquín-Gutiérrez, F. (2026). Temperature-Dependent Tethered Locomotion Behavior in the Madagascar Hissing Cockroach Using a Controlled-Environment Treadmill Platform with Exploratory Illumination Assays. <i>Biology</i>, 15(12), 947. doi:10.3390/biology15120947. <span class="tag">Editor’s Choice</span> <span class="tag">Q1 · FI 4.3</span>',
 ch_h="Capítulos de libro",
 ch=None,
 res_h="Experiencia en investigación",
 res=[("Sep 2025 – Mar 2026","Servicio social — INAOE, área de Electrónica","Instituto Nacional de Astrofísica, Óptica y Electrónica, Puebla, México",
        ["Caracterización de <i>Gromphadorhina portentosa</i> ante estímulos ambientales y eléctricos para su uso como sistema biorrobótico.","Diseño e implementación de un entorno controlado de temperatura y luz."]),
      ("May – Ago 2025","Prácticas profesionales — INAOE, área de Electrónica","Bajo la dirección del Dr. Luis Hernández Martínez",
        ["Adaptación de especímenes a condiciones experimentales controladas.","Implementación de un entorno experimental con temperatura, humedad y luz programables; resultados publicados en <i>Biology</i>."]),
      ("En curso","Cyborg Insects Initiative (C2I)","Biorrobótica basada en insectos",
        ["Aprendizaje automático para estimular cucarachas cíborg evitando la habituación.","Videogrametría con cámara web y código QR para rastrear el movimiento sin mochilas electrónicas pesadas.","Caracterización de parámetros de estimulación para un control eficiente del movimiento."])],
 proj_h="Proyectos destacados",
 proj=[("Pastillero inteligente semiportátil para pacientes con polifarmacia","Dispensador automático de 21 compartimentos, alarmas audiovisuales, pantalla TFT y app móvil multiplataforma (SmartDose)."),
       ("Sistema IoMT para cirugía y monitoreo remoto","Interfaz de control con video en vivo y ECG remoto para apoyo quirúrgico y seguimiento a distancia."),
       ("Extracción de características para el diagnóstico de Parkinson","Procesamiento de señales fisiológicas para obtener características de apoyo al diagnóstico clínico."),
       ("Reconstrucción 3D de imágenes de TC","Reconstrucción volumétrica de cortes de TC con vistas axial, coronal y sagital."),
       ("Simulación de compraventa de acciones (COMP 6905)","Proyecto en equipo de ingeniería de software en Memorial University.")],
 aw_h="Distinciones y premios",
 aw=[("2026","Artículo Editor’s Choice — <i>Biology</i> (MDPI)"),("2026","Beca completa de maestría — Memorial University of Newfoundland"),("2026","<i>Summa cum laude</i> — Ingeniería Biomédica, UDLAP"),
     ("2025","3er lugar — Silldromo 2025, aplicaciones biomédicas a partir de bioseñales, INAOE"),("2025","1er lugar, categoría Junior — Expo CEM 2.0, UDLAP"),
     ("2025","Ganador — IICNNCD, adquisición de datos y modelado estadístico de cucarachas cíborg"),("—","2º lugar, concurso de carteles — II Congreso Nacional de Ciencia de Datos"),
     ("2026","Reconocimiento — Colegio Ángeles"),("2023","Miembro — Programa de Honores UDLAP")],
 conf_h="Congresos y presentaciones",
 conf=["International Conference on Ontologies and Knowledge Graphs (ICOKG 2025), BUAP — ponente",
       "Congreso Nacional de Ingeniería Biomédica (CNIB 2025), SOMIB — cartel “Sistema de análisis biomecánico”",
       "7ª Jornada de Mujeres en la Ciencia, BUAP (2025) — cartel “Sistema de monitoreo de señales biomecánicas”",
       "II Congreso del Programa de Honores, UDLAP — panelista",
       "Expo CEM 3.0 (otoño 2025), Expo CEM 2.0 (primavera 2025) y Expo CEM (otoño 2024), UDLAP"],
 cert_h="Certificaciones y cursos",
 cert=["Focus on Peer Review — Nature Masterclasses (2025)","IA en la Investigación en Salud Global, MSC1125H — University of Toronto (2025)",
       "Startups en Ciencias Médicas, MSC1122H — University of Toronto (2025)","Sensores portátiles para monitoreo cardiorrespiratorio — IEEE (2025)",
       "Bachelor’s Master Classes — Boston Scientific (2025)","Diplomado en Neuroaprendizaje, 100 h — Universidad Anáhuac Puebla (2025)",
       "IA en Medicina, MSC1114H — University of Toronto (2023)","Microsoft Office Specialist: Excel 2016 (2018)"],
 sk_h="Habilidades",
 sk=[("Software","JavaScript, Node.js, Express, ViteExpress, APIs REST, OpenAPI, JSDoc, pruebas automatizadas, HTML/CSS, arquitectura de software"),
     ("Datos","MongoDB Atlas (driver nativo), Plotly.js, visualización de datos, APIs de datos de mercado"),
     ("Científicas","Python, Jupyter, procesamiento de señales, modelos de efectos mixtos, estadística no paramétrica, visión por computadora, aprendizaje automático"),
     ("Biomédicas","Instrumentación, sistemas embebidos, microcontroladores, adquisición de bioseñales, imagen térmica, control ambiental"),
     ("Herramientas","Git, GitHub, redacción científica, revisión por pares")],
 lang_h="Idiomas", langs="Español (nativo) · Inglés (profesional)",
 int_h="Intereses", ints="Fotografía (Canon EOS R50) · juegos de estrategia · lectura · música",
 updated="Actualizado en noviembre de 2026",
)}
L["es"]["ch"] = L["en"]["ch"]

CSS = """
@page { size: Letter; margin: 0.4in 0 0.35in; } @page :first { margin-top: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; color: #1d2b2e; font-size: 8.8pt; line-height: 1.32; }
.page { padding: 0 0.62in 0.45in; }
header { background: linear-gradient(120deg, #02323c 0%, #0b3d52 60%, #16285a 100%); color: #fff; padding: 0.36in 0.62in 0.26in; margin: 0 -0.62in 0.18in; position: relative; }
header::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 5px; background: linear-gradient(90deg,#e13700 0 25%,#E9A23B 25% 50%,#2F6F9F 50% 75%,#7A1F35 75%); }
h1 { margin: 0; font-size: 25pt; letter-spacing: 0.5px; }
.sub { color: #E9A23B; font-weight: 700; font-size: 10.5pt; margin-top: 2px; }
.contact { margin-top: 8px; font-size: 8.4pt; display: flex; flex-wrap: wrap; gap: 4px 14px; color: #dbe7ea; }
.contact a { color: #fff; text-decoration: none; }
h2 { font-size: 10.6pt; text-transform: uppercase; letter-spacing: 1.4px; color: #02323c; margin: 10px 0 5px; padding-bottom: 2px; border-bottom: 2px solid #E9A23B; break-after: avoid; }
h3 { font-size: 9.6pt; margin: 6px 0 2px; color: #7A1F35; break-after: avoid; }
p { margin: 0 0 4px; text-align: justify; }
.entry { display: grid; grid-template-columns: 1.05in 1fr; column-gap: 12px; margin-bottom: 4px; break-inside: avoid; }
.when { color: #e13700; font-weight: 700; font-size: 8.4pt; padding-top: 1px; }
.what b { color: #02323c; }
.where { color: #5a6a6d; font-size: 8.5pt; }
ul { margin: 2px 0 0; padding-left: 14px; }
li { margin-bottom: 1.5px; }
.tag { display: inline-block; background: #E9A23B; color: #02323c; font-weight: 700; font-size: 7.4pt; border-radius: 8px; padding: 0 6px; }
.two { break-inside: avoid; display: grid; grid-template-columns: 1fr 1fr; column-gap: 22px; }
.aw { display: grid; grid-template-columns: 0.42in 1fr; column-gap: 8px; margin-bottom: 2px; }
.aw .y { color: #e13700; font-weight: 700; font-size: 8.4pt; }
.sk { display: grid; grid-template-columns: 0.95in 1fr; column-gap: 10px; margin-bottom: 3px; }
.sk b { color: #2F6F9F; }
.upd { position: absolute; top: 0.2in; right: 0.62in; font-size: 7.4pt; color: #b8c8d6; }
.foot { margin-top: 12px; font-size: 7.6pt; color: #8a9799; text-align: right; }
section { break-inside: auto; }
"""

def build(l):
    t = L[l]
    c = f'''<div class="contact">
      <span>✉ <a href="mailto:egracidasrey@mun.ca">egracidasrey@mun.ca</a></span>
      <span>📍 {t["location"]}</span>
      <span>🌐 <a href="https://euardogracidas.github.io/egracidasrey/">euardogracidas.github.io/egracidasrey</a></span>
      <span>in <a href="https://www.linkedin.com/in/eduardo-gracidas-reyes-9a9662331">linkedin.com/in/eduardo-gracidas-reyes-9a9662331</a></span>
      <span>ORCID <a href="https://orcid.org/0009-0002-9145-2792">0009-0002-9145-2792</a></span>
      <span>Scholar <a href="https://scholar.google.ca/citations?user=96jGhLoAAAAJ&hl=en">scholar.google.ca/citations?user=96jGhLoAAAAJ</a></span>
      <span>GitHub <a href="https://github.com/EuardoGracidas">github.com/EuardoGracidas</a></span></div>'''
    edu = "".join(f'<div class="entry"><div class="when">{w}</div><div class="what"><b>{a}</b><div class="where">{b}</div><div>{d}</div></div></div>' for w,a,b,d in t["edu"])
    res = "".join(f'<div class="entry"><div class="when">{w}</div><div class="what"><b>{a}</b><div class="where">{b}</div><ul>{"".join(f"<li>{x}</li>" for x in li)}</ul></div></div>' for w,a,b,li in t["res"])
    proj = "<ul>" + "".join(f"<li><b>{a}.</b> {b}</li>" for a,b in t["proj"]) + "</ul>"
    aw = "".join(f'<div class="aw"><span class="y">{y}</span><span>{x}</span></div>' for y,x in t["aw"])
    conf = "<ul>" + "".join(f"<li>{x}</li>" for x in t["conf"]) + "</ul>"
    cert = "<ul>" + "".join(f"<li>{x}</li>" for x in t["cert"]) + "</ul>"
    sk = "".join(f'<div class="sk"><b>{a}</b><span>{b}</span></div>' for a,b in t["sk"])
    ch = "<ul>" + "".join(f"<li>{x}</li>" for x in t["ch"]) + "</ul>"
    return f'''<!DOCTYPE html><html lang="{l}"><head><meta charset="utf-8"><style>{CSS}</style></head><body><div class="page">
<header><span class="upd">{t["updated"]}</span><h1>Eduardo Gracidas Reyes</h1><div class="sub">{t["title"]}</div>{c}</header>
<h2>{t["profile_h"]}</h2><p>{t["profile"]}</p>
<h2>{t["edu_h"]}</h2>{edu}
<h2>{t["pub_h"]}</h2><h3>{t["art_h"]}</h3><p>{t["art"]}</p><h3>{t["ch_h"]}</h3>{ch}
<h2>{t["res_h"]}</h2>{res}
<h2>{t["proj_h"]}</h2>{proj}
<h2>{t["aw_h"]}</h2>{aw}
<h2>{t["conf_h"]}</h2>{conf}
<div class="two"><div><h2>{t["cert_h"]}</h2>{cert}</div><div><h2>{t["sk_h"]}</h2>{sk}<h2>{t["lang_h"]}</h2><p>{t["langs"]}</p><h2>{t["int_h"]}</h2><p>{t["ints"]}</p></div></div>
</div></body></html>'''

async def main():
    out = sys.argv[1]
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome")
        for l, name in [("en","Eduardo_Gracidas_Reyes_CV_EN"),("es","Eduardo_Gracidas_Reyes_CV_ES")]:
            html = build(l)
            open(f"/tmp/cv/{name}.html","w").write(html)
            pg = await b.new_page()
            await pg.set_content(html)
            await pg.pdf(path=f"{out}/{name}.pdf", print_background=True, prefer_css_page_size=True)
        await b.close()
asyncio.run(main())
