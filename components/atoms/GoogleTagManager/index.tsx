import { FunctionComponent } from 'react'

import { StyledIframe } from './GoogleTagManagerStyles'

interface Props {
    /**
     * GTM tracking ID, starting with "GTM-".
     */
    id: string
}

/**
 * Google Tag Manager script tag. This should be rendered in the <head>.
 */
export const GoogleTagManagerScriptTag: FunctionComponent<Props> = props => (
    <script
        dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${props.id}');`,
        }}
    />
)

/**
 * Google Tag Manager (noscript). This is a JS-disabled fallback for the GTM
 * script. This should be rendered in the <body> element (ideally right after
 * the opening <body> tag).
 */
export const GoogleTagManagerNoscriptFrame: FunctionComponent<Props> = props => (
    <noscript>
        <StyledIframe
            title="google-tag-manager-noscript-frame"
            src={`https://www.googletagmanager.com/ns.html?id=${props.id}`}
        />
    </noscript>
)