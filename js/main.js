const siteName = 'Sun Project';
const email = 'info@sunproject.lv';

const HeaderComponent = {
    template : `
    <div id="header" class="bg-light py-2">
    <header class="container d-flex justify-content-between">
        <div><slot name="logo" /></div>
        <nav class="ml-md-4">
            <ul class="list-group list-unstyled flex-row h-100 align-items-center h6">
                <li 
                    v-for="(title, i) in data" :key="i"
                    @click="switchContent(i)" 
                    class="mx-2 mx-md-3 rounded hover-underline-animation" 
                    :class="page === i ? 'active' : ''">
                    {{ title }}
                </li>
            </ul>
        </nav>
    </header>
    </div>`,
    props: {
        data: {
            type: Array,
            required: true,  
        },
    },
    data() {
        return {
            page: 0,
        }
    },
    async mounted() {
        await this.$nextTick();
        const hash = window.location.hash.replace('#', '');
        this.data.forEach((title, index) => { 
            if (title.toLowerCase().replace(' ', '-') === hash) {
                this.page = index;
                this.$root.$emit('switch', index);
                
                return;
            }
         });
    },
    methods: {
        switchContent(nr) {
            this.page = nr;
            this.$root.$emit('switch', nr);
            window.location.hash = '#' + this.data[nr].toLowerCase().replace(' ', '-');
        }
    }
};

const ContentComponent = {
    template: `
    <div id="content">
        <div v-show="page === 0" class="container">
            <slot name="content1" />
        </div>
        <div v-show="page === 1">
            <div class="side-cut mx-auto gradient-full">
                <div class="container d-flex justify-content-end" style="height: 140px;">
                    <div @click="switchSection(0)" class="w-50 my-auto text-right mr-5 zoom" :class="section === 0 ? 'zoomed' : ''">
                        <div class="ml-auto" style="width: 50px; color: #01ade5;">
                            <svg aria-hidden="true" focusable="false" data-prefix="custom" data-icon="factory" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.5 119.9" data-fa-i2svg=""><path fill="currentColor" d="M55.1 0c-1.1 0-2 .9-2 2s.9 2 2 2H87c3.6 0 6.6 2.9 6.6 6.5v7.4h-4v-6c0-2.2-1.8-4-4-4H75.2c-1.1 0-2 .9-2 2s.9 2 2 2h10.5v6c-1.1 0-1.901.9-1.901 2v51.9l-24.9-19.3c-.6-.5-1.4-.6-2.1-.2-.7.3-1.1 1-1.1 1.8v17.6L31.1 52.5c-.6-.5-1.399-.6-2.099-.2-.7.3-1.102 1-1.102 1.8v17.6L3.2 52.5c-.6-.5-1.4-.6-2.1-.2-.7.3-1.1 1-1.1 1.8v63.8c0 1.1.9 2 2 2h95.5c1.1 0 2-.9 2-2v-98c0-1.1-.9-2-2-2v-7.4C97.5 4.7 92.698 0 86.898 0zm32.5 21.9h7.9v94H67.898v-15.699c0-1.1-.9-2-2-2H33.5c-1.1 0-2 .9-2 2v15.7H3.898V58.2L28.6 77.4c.6.5 1.4.599 2.1.199.7-.3 1.099-1 1.099-1.8V58.202l24.701 19.2c.6.5 1.4.599 2.1.199.7-.3 1.1-1 1.1-1.8V58.202l24.698 19.2c.6.5 1.402.599 2.102.199.7-.3 1.1-1 1.1-1.8zm-52.1 80.301h28.299v13.7H35.5z"></path></svg>
                        </div>
                        <h4 class="text-white h4">Fotoelementi biznesam</h4>
                    </div>
                    <div @click="switchSection(1)" class="gradient side-cut w-50 text-right d-flex flex-column justify-content-center pr-5 zoom" :class="section === 1 ? 'zoomed' : ''">
                        <div class="ml-auto" style="width: 63px; color: #01ade5;">
                            <svg aria-hidden="true" focusable="false" data-prefix="custom" data-icon="solar-panel" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282.021 269.026" data-fa-i2svg=""><path fill="currentColor" d="M75.711.428c0 2.496-4.532 2.032-4.54 4.528l-.062 23.74 1.123-.078a48.083 48.083 0 016.832.017l1.124.084.062-23.74a4.511 4.511 0 00-1.32-3.213c-.855-.86-3.22-2.562-3.22-1.338zM25.463 21.086a4.51 4.51 0 00-3.201 1.32 4.546 4.546 0 00-.018 6.42l16.742 16.83.74-.847a48.21 48.21 0 014.844-4.818l.854-.735L28.68 22.424a4.511 4.511 0 00-3.217-1.338zm100.385.266a4.504 4.504 0 00-3.2 1.32l-16.832 16.743.848.738a48.25 48.25 0 014.82 4.846l.735.851 16.83-16.742a4.518 4.518 0 001.338-3.207 4.512 4.512 0 00-1.32-3.213 4.51 4.51 0 00-3.22-1.336zm-50.327 17.2c-9.989 0-19.38 3.888-26.443 10.952-7.064 7.063-10.953 16.457-10.953 26.446 0 9.99 3.89 19.381 10.953 26.445 7.063 7.063 16.454 10.953 26.443 10.953 9.99 0 19.382-3.889 26.446-10.953 7.063-7.063 10.955-16.455 10.955-26.445 0-9.99-3.892-19.382-10.955-26.446-7.064-7.063-16.457-10.953-26.446-10.953zm0 6.982c16.798 0 30.417 13.618 30.417 30.416 0 16.799-13.618 30.416-30.417 30.416-16.798 0-30.416-13.617-30.416-30.416 0-16.798 13.618-30.416 30.416-30.416zM4.54 71.224A4.548 4.548 0 000 75.75a4.509 4.509 0 001.32 3.212A4.514 4.514 0 004.527 80.3l23.74.063-.078-1.121a48.109 48.109 0 01.02-6.834l.082-1.121zm118.238.312l.077 1.123a47.785 47.785 0 01-.018 6.832l-.082 1.123 23.742.062h.01a4.505 4.505 0 003.201-1.32 4.515 4.515 0 001.34-3.207 4.547 4.547 0 00-4.527-4.553zm95.8 60.777a4.348 4.348 0 00-3.087 1.277l-88.19 88.19a4.365 4.365 0 006.173 6.172l49.98-49.98v86.689a4.365 4.365 0 004.363 4.365 4.365 4.365 0 004.364-4.365v-36.38c.129-.102.254-.21.373-.33l49.98-49.98v86.69a4.365 4.365 0 004.364 4.365 4.365 4.365 0 004.363-4.365v-95c0-.134-.008-.268-.02-.399l29.5-29.5a4.362 4.362 0 00.004-6.172 4.365 4.365 0 00-6.174 0l-82.388 82.391v-46.32c0-.134-.008-.268-.02-.399l29.5-29.5a4.365 4.365 0 00-3.086-7.449zM38.827 106.049l-16.832 16.743a4.544 4.544 0 00-.017 6.418 4.508 4.508 0 003.218 1.337 4.51 4.51 0 003.201-1.32l16.83-16.742-.847-.74a47.978 47.978 0 01-4.818-4.842zm73.23.194l-.738.847a48.35 48.35 0 01-4.845 4.82l-.852.735 16.742 16.832a4.51 4.51 0 003.219 1.338c1.208 0 2.344-.47 3.201-1.322a4.542 4.542 0 00.016-6.418zM70.86 123.18l-.062 23.742c-.006 2.501 2.024 4.551 4.527 4.551h.01a4.546 4.546 0 004.54-4.527l.062-23.74-1.121.076c-2.268.156-4.575.15-6.833-.018z"></path></svg>
                        </div>
                        <h4 class="text-white h4">Saules parki</h4>
                    </div>
                </div>
            </div>
            <div class="container">
                <div v-show="section === 0">
                    <slot name="content21" />
                </div>
                <div v-show="section === 1">
                    <slot name="content22" />
                 </div>
            </div>
        </div>
        <div v-show="page === 2" class="container">
            <slot name="content3" />
        </div>
    </div>
        `,
    data() {
        return {
            page: 0,
            section: 0,
        }
    },
    mounted() {
        this.$root.$on('switch', nr => {
            this.page = nr;
        });
    },
    methods: {
        switchSection(nr) {
            this.section = nr;
        }
    }
};    

const FooterComponent = {
    template: `
    <div class="bg-light">
        <hr>
        <footer class="container py-3">
            <div>SUN PROJECT SIA</div>
            <div>Vienības gatve 101</div>
            <div>Rīga, LV-1058, Latvija</div>
            <div>VAT no. LV40203457366</div>
            <div>Luminor banka: RIKOLV2X</div>
            <div>Konts: LV37RIKO0002930354695</div>
            <div>E-pasts: <a href="mailto:`+ email +`">`+ email +`</a></div>
        </footer>
    </div>
        `
};    

const app = new Vue({
    el: '#app',
    components : {
        'header-component': HeaderComponent,
        'content-component': ContentComponent,
        'footer-component': FooterComponent
    }
});