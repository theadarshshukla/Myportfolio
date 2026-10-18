import React from 'react';
import Article from "/src/components/articles/base/Article.jsx";
import { useConstants } from "/src/hooks/constants.js";
import "./ArticleBookSpecs.scss"; // ✅ Same folder ke liye relative import

const ArticleBookSpecs = ({ data, locale = "hi" }) => {
    const { currentTheme } = useConstants();

    if (!data || !data.items || data.items.length === 0) {
        return null;
    }

    const rawTitleTemplate = data.locales?.[locale]?.title || data.locales?.['en']?.title || "Book Specifications";
    const formattedTitle = rawTitleTemplate
        .replace("{{Specifications}}", locale === 'hi' ? "विशेषताएं" : locale === 'es' ? "Especificaciones" : "Specifications")
        .replace("{{Libro}}", locale === 'hi' ? "पुस्तक" : locale === 'es' ? "Libro" : "Book")
        .replace("{{Book}}", "Book");

    return (
        <Article className={`article-book-specs-wrapper theme-${currentTheme}`}>
            <div className="book-specs-container">
                <div className="specs-header-block">
                    <h3>{formattedTitle}</h3>
                    <div className="header-line-accent"></div>
                </div>

                <div className={`specs-grid-layout ${data.settings?.display_grid ? 'grid-enabled' : 'list-view'}`}>
                    {data.items.map((spec) => {
                        const labelText = spec.label[locale] || spec.label['en'];
                        const valueText = spec.value[locale] || spec.value['en'];

                        return (
                            <div key={spec.id} className="spec-card-item">
                                <div className="spec-icon-wrapper">
                                    <i className={spec.faIcon || "fa-solid fa-circle-check"}></i>
                                </div>
                                <div className="spec-content-group">
                                    <span className="spec-label">{labelText}</span>
                                    <span className="spec-value">{valueText}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Article>
    );
};

export default ArticleBookSpecs;