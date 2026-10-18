import "./ArticlePublication.scss"
import React, { useState } from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import Link from "/src/components/generic/Link.jsx"
import AvatarView from "/src/components/generic/AvatarView.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePublication({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-publication`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticlePublicationContent dataWrapper={dataWrapper}
                                     selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePublicationContent({ dataWrapper, selectedItemCategoryId }) {
    const allItems = dataWrapper.getItems ? dataWrapper.getItems() : (dataWrapper.items || dataWrapper.raw?.items || [])

    // 1. Primary Book Item
    const bookItem = allItems.find(item => (item.raw || item).id === 1) || allItems[0] || {}
    const bookRaw = bookItem.raw || bookItem
    
    const currentLang = dataWrapper.currentLocale || 'hi'
    const bookLocales = bookItem.locales || bookRaw.locales || {}
    const activeLocaleData = bookLocales[currentLang] || bookLocales.hi || bookLocales.en || Object.values(bookLocales)[0] || {}

    const frontCoverImg = bookRaw.frontCover || "images/pictures/FrontCover.jpg"
    const backCoverImg = bookRaw.backCover || "images/pictures/BackCover.png"

    // 2. Metadata Items
    let metaItems = allItems.filter(item => {
        const raw = item.raw || item;
        return raw.type === "meta" || (raw.id >= 2 && raw.id <= 9);
    });

    if (metaItems.length === 0) {
        metaItems = [
            { id: 8, icon: "fa-solid fa-user-pen", locales: { hi: { title: "लेखक", text: "आदर्श शुक्ला" }, en: { title: "Author", text: "Adarsh Shukla" } } },
            { id: 2, icon: "fa-solid fa-book", locales: { hi: { title: "पुस्तक का नाम", text: "इलाहाबाद की संगिनी" }, en: { title: "Book Title", text: "Allahabad ki Sangini" } } },
            { id: 9, icon: "fa-solid fa-star", locales: { hi: { title: "श्रेणी", text: "काव्यात्मक कथा" }, en: { title: "Category", text: "Bestseller Fiction" } } },
            { id: 3, icon: "fa-solid fa-feather", locales: { hi: { title: "विधा", text: "साहित्यिक उपन्यास" }, en: { title: "Genre", text: "Literary Novel" } } },
            { id: 4, icon: "fa-solid fa-calendar-days", locales: { hi: { title: "प्रकाशन वर्ष", text: "सितंबर 2026" }, en: { title: "Release Date", text: "September 2026" } } },
            { id: 5, icon: "fa-solid fa-barcode", locales: { hi: { title: "ISBN नंबर", text: "978-93-344-96-499" }, en: { title: "ISBN", text: "9789334496499" } } },
            { id: 6, icon: "fa-solid fa-building", locales: { hi: { title: "प्रकाशन संस्थान", text: "स्वतंत्र प्रकाशन" }, en: { title: "Publisher", text: "Swatantra Prakashan" } } },
            { id: 7, icon: "fa-solid fa-globe", locales: { hi: { title: "प्लेटफॉर्म", text: "Amazon/ Google Book" }, en: { title: "Platform", text: "Amazon KDP" } } }
        ];
    }

    // 3. Details Item
    const detailsItem = allItems.find(item => {
        const raw = item.raw || item;
        return raw.type === "details" || raw.id === 10;
    })
    const detailsRaw = detailsItem?.raw || detailsItem || {}
    const detailsLocales = detailsItem?.locales || detailsRaw.locales || {}
    const activeDetails = detailsLocales[currentLang] || detailsLocales.hi || detailsLocales.en || Object.values(detailsLocales)[0] || {}

   // 4. Links Item (Update actionLinks with multiple platforms)
    const linksItem = allItems.find(item => {
        const raw = item.raw || item;
        return raw.type === "links" || raw.id === 11;
    })
    const linksRaw = linksItem?.raw || linksItem || {}
    const actionLinks = linksRaw.links || [
        { 
            id: 'amazon', 
            href: 'https://www.amazon.in/%E0%A4%87%E0%A4%B2%E0%A4%BE%E0%A4%B9%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%A6-%E0%A4%95%E0%A5%80-%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A4%BF%E0%A4%A8%E0%A5%80-%E0%A4%85%E0%A4%A8%E0%A4%95%E0%A4%B9%E0%A5%80-%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%87%E0%A4%AE-ebook/dp/B0HJNW2Z2Y/ref=sr_1_1?dib=eyJ2IjoiMSJ9.EHx_JLY8Yac6mriLeuR8Ig.BNvKZDBS5O4E-8EFxCZNsYC4jDRmTUJQV53JQDNvym0&dib_tag=se&keywords=%E0%A4%87%E0%A4%B2%E0%A4%BE%E0%A4%B9%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%A6+%E0%A4%95%E0%A5%80+%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A4%BF%E0%A4%A8%E0%A5%80&qid=1790837531&s=books&sr=1-1', // अपना अमेज़ॅन लिंक यहाँ डालें
            icon: 'fa-brands fa-amazon', 
            className: 'amazon-btn',
            locales: { hi: { title: 'Buy on Amazon' }, en: { title: 'Buy on Amazon' } } 
        },
        { 
            id: 'google-play', 
            href: 'https://play.google.com/store/books/details/ADARSH_SHUKLA_%E0%A4%87%E0%A4%B2_%E0%A4%B9_%E0%A4%AC_%E0%A4%A6_%E0%A4%95_%E0%A4%B8_%E0%A4%97_%E0%A4%A8?id=lzsLEgAAQBAJ', // अपना गूगल प्ले बुक्स लिंक यहाँ डालें
            icon: 'fa-solid fa-play', 
            className: 'google-play-btn',
            locales: { hi: { title: 'Google Play Books' }, en: { title: 'Google Play Books' } } 
        },
        { 
            id: 'flipbook', 
            href: '#', // फ्लिपबुक का लिंक या फंक्शन
            icon: 'fa-solid fa-eye', 
            className: 'flipbook-btn',
            locales: { hi: { title: 'Preview Flipbook' }, en: { title: 'Preview Flipbook' } } 
        }
    ]

    // 5. Works Showcase Item
    const worksItem = allItems.find(item => {
        const raw = item.raw || item;
        return raw.type === "works" || raw.id === 12;
    })
    const worksRaw = worksItem?.raw || worksItem || {}
    const showcaseWorks = worksRaw.works || []

    return (
        <div className={`article-publication-wrapper`}>
            
            <div className={`article-publication-top-section`}>
                
                {/* Left Side: Metadata Cards */}
                <div className={`article-publication-left`}>
                    <div className={`article-publication-meta-grid`}>
                        {metaItems.map((metaWrapper, index) => {
                            const rawMeta = metaWrapper.raw || metaWrapper
                            const metaLocales = metaWrapper.locales || rawMeta.locales || {}
                            const activeMeta = metaLocales[currentLang] || metaLocales.hi || metaLocales.en || Object.values(metaLocales)[0] || {}

                            const itemLabel = activeMeta.title || rawMeta.key || `Detail ${index + 1}`
                            const itemValue = activeMeta.text || "—"
                            const iconClass = rawMeta.icon || "fa-solid fa-circle-dot"

                            return (
                                <div className={`publication-meta-card`} key={rawMeta.id || index}>
                                    <div className={`meta-icon-title`}>
                                        <i className={iconClass}></i>
                                        <span className={`meta-label`}>{itemLabel}</span>
                                    </div>
                                    <span className={`meta-value`}>
                                        {itemValue}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    {activeLocaleData.authorNote && (
                        <div className={`article-publication-quote last-p-no-margin text-3`}>
                            <p><em>“{activeLocaleData.authorNote}”</em></p>
                        </div>
                    )}
                </div>

                {/* Right Side: Professional 3D Hardcover Book */}
                <div className={`article-publication-right`}>
                    <div className={`book-wrap`}>
                        <div className={`book-3d-container`}>
                            <div className={`book-hardcover`}>
                                <div className={`book-page front-cover`}>
                                    <img src={frontCoverImg} alt={bookRaw.imageAlt || "Book Front Cover"} />
                                </div>
                                <div className={`book-page back-cover`}>
                                    <img src={backCoverImg} alt="Book Back Cover" />
                                </div>
                                <div className={`book-spine-effect`}></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Middle Section: Details */}
            <div className={`article-publication-details-section`}>
               
                
                {activeDetails.text ? (
                    <div className={`details-desc`}
                         dangerouslySetInnerHTML={{ __html: activeDetails.text }} />
                ) : (
                    <p className={`details-desc`}>
                        {activeLocaleData.text || "'इलाहाबाद की संगिनी' आदर्श शुक्ला की एक मौलिक और संवेदनशील साहित्यिक कृति है। यह उपन्यास प्रेम, विरह, मानवीय संवेदनाओं, संघर्ष और स्मृतियों के ताने-बाने के बीच इलाहाबाद शहर की सजीव सांस्कृतिक आत्मा और उसकी ऐतिहासिक विरासत को अत्यंत प्रभावशाली ढंग से पाठकों के समक्ष प्रस्तुत करता है" }
                    </p>
                )}

                {actionLinks.length > 0 && (
                    <div className={`publication-action-buttons`}>
                        {actionLinks.map((lnk) => {
                            const lnkLocales = lnk.locales || {}
                            const lnkActive = lnkLocales[currentLang] || lnkLocales.hi || lnkLocales.en || {}
                            const lnkTitle = lnkActive.title || lnk.id
                            
                            return (
                                <a key={lnk.id || lnk.href} 
                                   href={lnk.href || "#"} 
                                   target={lnk.target || "_blank"} 
                                   rel="noopener noreferrer" 
                                   className={`pub-btn ${lnk.className || 'google-btn'}`}>
                                    <i className={lnk.icon || "fa-solid fa-link"}></i> {lnkTitle}
                                </a>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Bottom Section */}
            {showcaseWorks.length > 0 && (
                <div className={`article-publication-sahityepedia`}>
                    <h4 className={`sahityepedia-heading`}>
                        <span className={`highlight-bar`}></span> साहित्यपीडिया (Sahityepedia) की अन्य रचनाएँ
                    </h4>
                    
                    <div className={`sahityepedia-grid`}>
                        {showcaseWorks.map((work, idx) => {
                            const workLocales = work.locales || {}
                            const workActive = workLocales[currentLang] || workLocales.hi || workLocales.en || {}
                            const workImg = work.image || frontCoverImg

                            return (
                                <div className={`sahityepedia-card`} key={work.id || idx}>
                                    <AvatarView src={workImg} className={`sahityepedia-avatar`} />
                                    <div className={`sahityepedia-info`}>
                                        <h5>{workActive.title || `रचना ${idx + 1}`}</h5>
                                        <p>{workActive.text || ""}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

        </div>
    )
}

export default ArticlePublication