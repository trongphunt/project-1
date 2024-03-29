<div class="<?php if( $active_photos ) echo 'active'; ?> tab" ng-if="settings['nbdesigner_enable_image'] == 'yes'" id="tab-photo" nbd-scroll="scrollLoadMore(container, type)" data-container="#tab-photo" data-type="photo" data-offset="30">
    <div class="nbd-search">
        <input ng-class="(resource.personal.status || !resource.photo.onclick) ? 'nbd-disabled' : ''" ng-keyup="$event.keyCode == 13 && getPhoto(resource.photo.type, 'search')" type="text" name="search" placeholder="<?php _e('Search photo', 'web-to-print-online-designer'); ?>" ng-model="resource.photo.photoSearch"/>
        <i class="icon-nbd icon-nbd-fomat-search"></i>
    </div>        
    <div class="tab-main tab-scroll">
        <div class="nbd-items-dropdown">
            <div class="main-items">
                <div class="items">
                    <div class="item" ng-click="onClickTab('upload', 'photo')" ng-if="settings['nbdesigner_enable_upload_image'] == 'yes'" data-type="image-upload" data-api="false">
                        <div class="main-item">
                            <div class="item-icon"><i class="icon-nbd icon-nbd-file-upload"></i></div>
                            <div class="item-info">
                                <span class="item-name" title="Image upload"><?php _e('Image Upload','web-to-print-online-designer'); ?></span>
                            </div>
                        </div>
                    </div>
                    <div class="item" ng-click="onClickTab('url', 'photo')" ng-if="settings['nbdesigner_enable_image_url'] == 'yes'" data-type="image-url" data-api="false">
                        <div class="main-item">
                            <div class="item-icon"><i class="icon-nbd icon-nbd-attachment"></i></div>
                            <div class="item-info">
                                <span class="item-name" title="Image url"><?php _e('Image url','web-to-print-online-designer'); ?></span>
                            </div>
                        </div>
                    </div>
                    <?php if($fbID != ''): ?>
                    <div class="item" ng-click="onClickTab('facebook', 'photo')" data-type="facebook" ng-if="settings['nbdesigner_enable_facebook_photo'] == 'yes'" data-api="false">
                        <div class="main-item">
                            <div class="item-icon"><i class="icon-nbd icon-nbd-facebook-logo"></i></div>
                            <div class="item-info">
                                <span class="item-name" title="Facebook"><?php _e('Facebook','web-to-print-online-designer'); ?></span>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>
                    <?php $insID = nbdesigner_get_option('nbdesigner_instagram_app_id'); if($insID != ''): ?>
                    <div class="item" ng-click="onClickTab('instagram', 'photo')" data-type="instagram" ng-if="settings['nbdesigner_enable_instagram_photo'] == 'yes'" data-api="false">
                        <div class="main-item">
                            <div class="item-icon"><i class="icon-nbd icon-nbd-instagram-logo"></i></div>
                            <div class="item-info">
                                <span class="item-name" title="Instagram"><?php _e('Instagram','web-to-print-online-designer'); ?></span>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>
                    <?php $dbID = nbdesigner_get_option('nbdesigner_dropbox_app_id'); if($dbID != ''): ?>
                    <div class="item" ng-click="onClickTab('dropbox', 'photo')" ng-if="settings['nbdesigner_enable_dropbox_photo'] == 'yes'" data-type="dropbox" data-api="false">
                        <div class="main-item">
                            <div class="item-icon"><i class="icon-nbd icon-nbd-dropbox-logo"></i></div>
                            <div class="item-info">
                                <span class="item-name" title="Dropbox"><?php _e('Dropbox','web-to-print-online-designer'); ?></span>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>
                    <div class="item" ng-click="initWebcam()" ng-if="hasGetUserMedia && !settings.is_mobile && settings['nbdesigner_enable_image_webcam'] == 'yes'" data-type="webcam" data-api="false">
                        <div class="main-item">
                            <div class="item-icon"><i class="icon-nbd icon-nbd-webcam"></i></div>
                            <div class="item-info">
                                <span class="item-name" title="Webcam"><?php _e('Webcam','web-to-print-online-designer'); ?></span>
                            </div>
                        </div>
                    </div>
                    <?php if( $valid_license ): ?>
                    <div class="item" ng-click="onClickTab('Pixabay', 'photo')" ng-if="settings['nbdesigner_enable_pixabay'] == 'yes'" data-type="pixabay" data-api="true">
                        <div class="main-item">
                            <div class="item-icon"><i class="icon-nbd icon-nbd-pixabay"></i></div>
                            <div class="item-info">
                                <span class="item-name" title="Pixabay"><?php _e('Pixabay','web-to-print-online-designer'); ?></span>
                            </div>
                        </div>
                    </div>
                    <div class="item" ng-click="onClickTab('Unsplash', 'photo')" ng-if="settings['nbdesigner_enable_unsplash'] == 'yes'" data-type="unsplash" data-api="true">
                        <div class="main-item">
                            <div class="item-icon"><i class="icon-nbd icon-nbd-camera-alt"></i></div>
                            <div class="item-info">
                                <span class="item-name" title="Unsplash"><?php _e('Unsplash','web-to-print-online-designer'); ?></span>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>
                <div class="pointer"></div>
            </div>
            <div class="result-loaded">
                <div class="content-items">
                    <div ng-class="settings['nbdesigner_upload_show_term'] !== 'yes' ? 'accept' : '' " class="content-item type-upload" data-type="image-upload">
                        <div ng-show="settings.nbdesigner_upload_designs_php_logged_in == 'yes' && !settings.is_logged">
                            <p><?php _e('You need to be logged in to upload images!','web-to-print-online-designer'); ?></p>
                            <button class="nbd-button nbd-hover-shadow" ng-click="login()"><?php _e('Login','web-to-print-online-designer'); ?></button>
                        </div>
                        <div ng-hide="settings.nbdesigner_upload_designs_php_logged_in == 'yes' && !settings.is_logged">
                            <div class="nbd-progress-bar">
                                <div class="nbd-progress-bar-inner" ng-style="{'width': resource.upload.progressBar + '%'}">
                                    <span class="indicator" ng-style="{'left': 'calc(' + resource.upload.progressBar + '% - 15px)'}">{{resource.upload.progressBar}}</span>
                                </div>
                            </div>
                            <div class="form-upload nbd-dnd-file" nbd-dnd-file="uploadFile(files)">
                                <i class="icon-nbd icon-nbd-cloud-upload"></i>
                                <span><?php _e('Click or drop images here','web-to-print-online-designer'); ?></span>
                                <input type="file" accept="image/*" style="display: none;" <?php if($settings['nbdesigner_upload_multiple_images'] == 'yes') echo 'multiple'; ?>/>
                            </div>
                            <div class="allow-size">
                                <span><?php _e('Accept file types','web-to-print-online-designer'); ?>: <strong>png, jpg, svg</strong></span>
                                <span><?php _e('Max file size','web-to-print-online-designer'); ?>: <strong>{{settings['nbdesigner_maxsize_upload']}} MB</strong></span>
                                <span><?php _e('Min file size','web-to-print-online-designer'); ?>: <strong>{{settings['nbdesigner_minsize_upload']}} MB</strong></span>
                                <span ng-if="settings.nbdesigner_upload_multiple_images == 'yes'"><?php _e('Max upload files','web-to-print-online-designer'); ?>: <strong>{{settings['nbdesigner_max_upload_files_at_once']}}</strong></span>
                            </div>
                            <div class="nbd-term" ng-if="settings['nbdesigner_upload_show_term'] == 'yes'">
                                <div class="nbd-checkbox">
                                    <input id="accept-term" type="checkbox">
                                    <label for="accept-term">&nbsp;</label>
                                </div>
                                <span class="term-read"><?php _e('I accept the terms','web-to-print-online-designer'); ?></span>
                            </div>
                            <div id="nbd-upload-wrap">
                                <div class="mansory-wrap">
                                    <div nbd-drag="img.url" extenal="false" type="image" class="mansory-item" ng-click="addImageFromUrl(img.url, false, img.ilr)" ng-repeat="img in resource.upload.data track by $index" repeat-end="onEndRepeat('upload')"><img ng-src="{{img.url}}"><span class="photo-desc">{{img.des}}</span></div>
                                </div>                             
                            </div>
                            <div style="text-align: left;margin-top: 15px;margin-left: 2px;"><span style="cursor: pointer;font-style: italic;font-size: 11px;" ng-click="_localStorage.delete('nbduploaded')"><?php _e('Clear all uploaded images','web-to-print-online-designer'); ?></span></div>
                        </div>    
                    </div>
                    <div class="content-item type-url" data-type="image-url">
                        <div class="form-group">
                            <label><?php _e('Image Url','web-to-print-online-designer'); ?></label>
                            <div class="input-group">
                                <input style="    border: 1px solid #404762; padding-left: 10px;" type="text" name="image-url" ng-model="resource.imageFromUrl" placeholder="<?php _e('Enter image url, allow: jpg, png, svg','web-to-print-online-designer'); ?>"/>
                                <button ng-class="resource.imageFromUrl !='' ? '' : 'nbd-disabled'" class="nbd-button" ng-click="addImageFromUrl(resource.imageFromUrl)"><?php _e('insert','web-to-print-online-designer'); ?></button>
                            </div>
                            <div style="text-align: left;">
                                <?php if( nbdesigner_get_option('nbdesigner_enable_google_drive') == 'yes' 
                                        && nbdesigner_get_option('nbdesigner_google_api_key') != '' 
                                        && nbdesigner_get_option('nbdesigner_google_client_id') != '' ): ?>
                                <button onclick="onApiLoad()" class="nbd-button" style="margin-left: 0;">
                                    <svg style="vertical-align: middle; margin-right: 15px;" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                        <title>drive</title>
                                        <path fill="#efc75e" d="M14.165 12.423l0.056 0.095h0.111l5.668-0.026-0.166-0.285-6.372-10.969h-0.111l-5.669 0.023 0.166 0.285c0 0 6.317 10.876 6.317 10.876z"></path>
                                        <path fill="#3db39e" d="M9.508 6.912l-0.056-0.096-2.915-4.985-0.164 0.285-6.373 11.009 0.056 0.095 2.915 4.986 0.165-0.285 6.318-10.914c0 0 0.054-0.095 0.054-0.095z"></path>
                                        <path fill="#26a6d1" d="M7.111 13.734h-0.11l-0.055 0.094-2.709 4.648-0.164 0.286h12.998l0.055-0.096 2.874-4.931h-12.889z"></path>
                                    </svg>                          
                                    <?php _e('Pick From Google Drive','web-to-print-online-designer'); ?>
                                </button>                                
                                <script type="text/javascript">
                                    var developerKey = '<?php echo nbdesigner_get_option('nbdesigner_google_api_key'); ?>';
                                    var clientId = "<?php echo nbdesigner_get_option('nbdesigner_google_client_id'); ?>";
                                    var _scope = ['https://www.googleapis.com/auth/drive.readonly'];
                                    var locale = '<?php echo $locale; ?>';
                                    var pickerApiLoaded = false;
                                    var oauthToken;
                                    function onApiLoad() {
                                        if( oauthToken ){
                                            createPicker();
                                        }else{
                                            gapi.load('auth', {'callback': onAuthApiLoad});
                                            gapi.load('picker', {'callback': onPickerApiLoad});                                               
                                        }
                                    }
                                    function onAuthApiLoad() {
                                        window.gapi.auth.authorize({
                                              'client_id': clientId,
                                              'scope': _scope,
                                              'immediate': false
                                            },
                                            handleAuthResult
                                        );
                                    }
                                    function onPickerApiLoad() {
                                        pickerApiLoaded = true;
                                        createPicker();
                                    }
                                    function handleAuthResult(authResult) {
                                        if (authResult && !authResult.error) {
                                           oauthToken = authResult.access_token;
                                           createPicker();
                                        }
                                    }
                                    function createPicker() {
                                        if (pickerApiLoaded && oauthToken) {
                                        var picker = new google.picker.PickerBuilder().
                                                addViewGroup(
                                                    new google.picker.ViewGroup(google.picker.ViewId.DOCS_IMAGES).
                                                    addView(google.picker.ViewId.DOCS_IMAGES)).
                                                setLocale(locale).    
                                                setOAuthToken(oauthToken).
                                                setDeveloperKey(developerKey).
                                                setCallback(pickerCallback).
                                                build();
                                        picker.setVisible(true);
                                        }
                                    }
                                    function pickerCallback(data) {
                                        var url = 'nothing';
                                        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                                            var doc = data[google.picker.Response.DOCUMENTS][0],
                                            url = doc[google.picker.Document.URL],
                                            scope = angular.element(document.getElementById("designer-controller")).scope(); 
                                            scope.resource.imageFromUrl = url;
                                            scope.resource.gapi = {'fileId': doc.id, 'oAuthToken': oauthToken, 'name': doc.name};
                                            scope.updateApp()
                                        }
                                    }
                                </script>                  
                                <script type="text/javascript" src="https://apis.google.com/js/api.js" gapi_processed="true"></script>  
                                <?php endif; ?>                                
                            </div>
                        </div>
                        <div ng-show="settings['nbdesigner_enable_svg_code'] == 'yes'" style="text-align: left;">
                            <div class="form-group">
                                <label><?php _e('SVG Code','web-to-print-online-designer'); ?></label>
                                <textarea style="max-width: 100%;" class="form-control hover-shadow nbdesigner_svg_code" rows="10" ng-model="resource.svgCode"  placeholder="<?php _e('Enter svg code','web-to-print-online-designer'); ?>"/></textarea>
                                <button ng-class="resource.svgCode !='' ? '' : 'nbd-disabled'" style="margin-left: 0;" class="nbd-button" ng-click="addSvgFromString(resource.svgCode)"><?php _e('Insert SVG','web-to-print-online-designer'); ?></button>
                            </div>
                        </div>                        
                    </div>
                    <div class="content-item type-facebook" data-type="facebook" id="nbd-facebook-wrap">
                        <?php if($fbID != ''): ?>
                        <div id="fb-root"></div>
                        <div class="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="false" data-scope="user_photos" onlogin="nbdOnFBLogin(null)"></div>
                        <div class="mansory-wrap">
                            <div nbd-drag="img.url" extenal="true" type="image" class="mansory-item" ng-click="addImageFromUrl(img.url)" ng-repeat="img in resource.facebook.data | limitTo: resource.facebook.filter.perPage * resource.facebook.filter.currentPage" repeat-end="onEndRepeat('facebook')"><img ng-src="{{img.preview}}"><span class="photo-desc">{{img.des}}</span></div>
                        </div>                          
                        <?php endif; ?>
                    </div>
                    <?php if($insID != ''): ?>
                    <div class="content-item type-instagram button-login" data-type="instagram" id="nbd-instagram-wrap">
                        <button class="nbd-button nbd-hover-shadow" ng-click="authenticateInstagram()" ng-hide="resource.instagram.token != ''">
                            <i class="icon-nbd icon-nbd-instagram-logo"></i>
                            <span><?php _e('Log in','web-to-print-online-designer'); ?></span>
                        </button>
                        <button class="nbd-button nbd-hover-shadow" ng-click="logoutInstagram()" ng-show="resource.instagram.token != ''">
                            <i class="icon-nbd icon-nbd-instagram-logo"></i>
                            <span><?php _e('Log out','web-to-print-online-designer'); ?></span>
                        </button>                        
                        <div class="mansory-wrap">
                            <div nbd-drag="img.url" extenal="true" type="image" class="mansory-item" ng-click="addImageFromUrl(img.url)" ng-repeat="img in resource.instagram.data | limitTo: resource.instagram.filter.perPage * resource.instagram.filter.currentPage" repeat-end="onEndRepeat('instagram')"><img ng-src="{{img.preview}}"><span class="photo-desc">{{img.des}}</span></div>
                        </div>                         
                    </div>
                    <?php endif; ?>
                    <?php if($dbID != ''): ?>
                    <div class="content-item type-dropbox" data-type="dropbox" id="nbd-dropbox-wrap">
                        <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="<?php echo $dbID; ?>"></script>
                        <script type="text/javascript">
                            NBDESIGNCONFIG['enable_dropbox'] = true;
                        </script>
                        <div id="nbdesigner_dropbox"></div>
                        <div class="mansory-wrap">
                            <div nbd-drag="img.url" extenal="true" type="image" class="mansory-item" ng-click="addImageFromUrl(img.url)" ng-repeat="img in resource.dropbox.data | limitTo: resource.dropbox.filter.perPage * resource.dropbox.filter.currentPage" repeat-end="onEndRepeat('dropbox')"><img ng-src="{{img.preview}}"><span class="photo-desc">{{img.des}}</span></div>
                        </div>                        
                    </div>
                    <?php endif; ?>
                    <div class="content-item type-webcam" data-type="webcam">
                        <?php _e('webcam','web-to-print-online-designer'); ?>
                    </div>
                </div>
                <div class="nbdesigner-gallery" id="nbdesigner-gallery">
                    <div nbd-drag="img.url" extenal="true" type="image" class="nbdesigner-item" ng-click="addImageFromUrl(img.url)" ng-repeat="img in resource.photo.data" repeat-end="onEndRepeat('photo')"><img ng-src="{{img.preview}}"><span class="photo-desc">{{img.des}}</span></div>
                </div>
                <div class="loading-photo" style="width: 40px; height: 40px;">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                </div>
                <div class="tab-load-more" style="display: none;" ng-show="!resource.photo.onload && resource.photo.data.length && (resource.photo.filter.totalPage == 0 || resource.photo.filter.currentPage < resource.photo.filter.totalPage)">
                    <a class="nbd-button" ng-click="scrollLoadMore('#tab-photo', 'photo')"><?php _e('Load more','web-to-print-online-designer'); ?></a>
                </div>                
            </div>
            <div class="info-support">
                <span>Facebook</span>
                <i class="icon-nbd icon-nbd-clear close-result-loaded" ng-click="onClickTab('', 'photo')"></i>
            </div>
        </div>
    </div>
</div>