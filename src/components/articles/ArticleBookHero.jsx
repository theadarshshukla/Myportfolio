import React, { useState } from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import Swipeable from "/src/components/capabilities/Swipeable.jsx"
import { useConstants } from "/src/hooks/constants.js"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import "./ArticleBookHero.scss" // ✅ Same folder ke liye relative import

const ArticleBookHero = ({ data, locale = "hi" }) => {
    const { currentTheme, isMobile } = useConstants();
    const [activeTab, setActiveTab] = useState('overview');
    const [isHovered, setIsHovered] = useState(false);

    if (!data || !data.items || data.items.length === 0) {
        return null;
    }

    const item = data.items[0];
    const localizedContent = item.locales?.[locale] || item.locales?.['en'] || {};
    const sectionTitle = data.locales?.[locale]?.section_title || data.locales?.['en']?.section_title || "";
    const badgeText = data.locales?.[locale]?.badge_text || data.locales?.['en']?.badge_text || "";

    return (
        <Article className={`article-book-hero-wrapper theme-${currentTheme}`}>
            <div className="book-hero-container">
                {sectionTitle && (
                    <div className="hero-header-banner">
                        <h2>{sectionTitle}</h2>
                        {badgeText && <span className="hero-badge" style={{ backgroundColor: item.badgeColor || '#8B5CF6' }}>{badgeText}</span>}
                    </div>
                )}

                <Swipeable activeBreakpoint="mobile">
                    <div 
                        className={`book-hero-grid layout-${data.settings?.layout_variant || 'split-screen-modern'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="book-cover-column">
                            <div className={`book-cover-card ${data.settings?.shadow_effect || 'elevated-glow'} ${isHovered ? 'hover-active' : ''}`}>
                                <div className="image-wrapper">
                                    <img 
                                        src={item.book_cover} 
                                        alt={localizedContent.title || "Book Cover"} 
                                        loading="lazy"
                                    />
                                    <div className="book-floating-icon">
                                        <i className={item.faIcon || "fa-solid fa-book-open"}></i>
                                    </div>
                                </div>
                                <div className="book-meta-strip">
                                    <span className="isbn-tag">ISBN: <strong>{item.isbn}</strong></span>
                                    <span className="release-tag">{item.release_date}</span>
                                </div>
                            </div>
                            
                            <div className="author-endorsement-box">
                                <AvatarView src="/images/authors/adarsh.jpg" size="small" alt="Adarsh Shukla" />
                                <div className="endorsement-text">
                                    <span className="author-name">Authored by Adarsh Shukla</span>
                                    <span className="publisher-name">{item.publisher}</span>
                                </div>
                            </div>
                        </div>

                        <div className="book-content-column">
                            <div className="book-title-group">
                                <h1 className="main-book-title">{localizedContent.title}</h1>
                                <p className="main-book-subtitle">{localizedContent.subtitle}</p>
                            </div>

                            <div className="book-nav-tabs">
                                <button 
                                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    <i className="fa-solid fa-circle-info"></i> Overview
                                </button>
                                <button 
                                    className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('details')}
                                >
                                    <i className="fa-solid fa-layer-group"></i> Publishing Info
                                </button>
                            </div>

                            <div className="book-description-container">
                                {activeTab === 'overview' ? (
                                    <div 
                                        className="html-description-content"
                                        dangerouslySetInnerHTML={{ __html: localizedContent.description }}
                                    />
                                ) : (
                                    <div className="publishing-details-card">
                                        <ul>
                                            <li><span>Platform:</span> <strong>{item.platform}</strong></li>
                                            <li><span>Publisher:</span> <strong>{item.publisher}</strong></li>
                                            <li><span>Genre:</span> <strong>{item.genre}</strong></li>
                                            <li><span>Catalog ID:</span> <strong>Wikidata Q141392257</strong></li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="book-action-buttons">
                                {item.actions?.map((action) => (
                                    <a 
                                        key={action.id}
                                        href={action.link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`hero-btn ${action.primary ? 'btn-primary-glow' : 'btn-secondary-outline'}`}
                                        title={action.link.tooltipString}
                                    >
                                        <i className={action.faIcon}></i>
                                        <span>{action.label[locale] || action.label['en']}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </Swipeable>
            </div>
        </Article>
    );
};

export default ArticleBookHero;