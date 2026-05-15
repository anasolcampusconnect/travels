@echo off
cd /d %~dp0

REM Create directory structure
mkdir src\assets\icons 2>nul
mkdir src\components\auth 2>nul
mkdir src\components\common 2>nul
mkdir src\components\export 2>nul
mkdir src\components\import 2>nul
mkdir src\components\layout 2>nul
mkdir src\components\parcel 2>nul
mkdir src\config 2>nul
mkdir src\contexts 2>nul
mkdir src\hooks 2>nul
mkdir src\pages 2>nul
mkdir src\services 2>nul
mkdir src\utils 2>nul

REM Create auth components
type nul > src\components\auth\ForgotPassword.jsx 2>nul
type nul > src\components\auth\Login.jsx 2>nul
type nul > src\components\auth\ProtectedRoute.jsx 2>nul
type nul > src\components\auth\Register.jsx 2>nul

REM Create common components
type nul > src\components\common\Button.jsx 2>nul
type nul > src\components\common\Card.jsx 2>nul
type nul > src\components\common\Input.jsx 2>nul
type nul > src\components\common\Loader.jsx 2>nul
type nul > src\components\common\Modal.jsx 2>nul

REM Create export components
type nul > src\components\export\ExportSummary.jsx 2>nul
type nul > src\components\export\ExportWizard.jsx 2>nul
type nul > src\components\export\FieldSelector.jsx 2>nul
type nul > src\components\export\FilterBuilder.jsx 2>nul
type nul > src\components\export\FormatSelector.jsx 2>nul

REM Create import components
type nul > src\components\import\ColumnMapper.jsx 2>nul
type nul > src\components\import\DataPreview.jsx 2>nul
type nul > src\components\import\FileUploader.jsx 2>nul
type nul > src\components\import\ImportSummary.jsx 2>nul
type nul > src\components\import\ImportWizard.jsx 2>nul

REM Create layout components
type nul > src\components\layout\Footer.jsx 2>nul
type nul > src\components\layout\Header.jsx 2>nul
type nul > src\components\layout\Layout.jsx 2>nul
type nul > src\components\layout\Sidebar.jsx 2>nul

REM Create parcel components
type nul > src\components\parcel\AdminParcelList.jsx 2>nul
type nul > src\components\parcel\CreateParcel.jsx 2>nul
type nul > src\components\parcel\ParcelCard.jsx 2>nul
type nul > src\components\parcel\ParcelTimeline.jsx 2>nul
type nul > src\components\parcel\TrackParcel.jsx 2>nul

REM Create config files
type nul > src\config\appConfig.js 2>nul
type nul > src\config\exportFormats.js 2>nul
type nul > src\config\fileTypes.js 2>nul

REM Create context files
type nul > src\contexts\AppContext.jsx 2>nul
type nul > src\contexts\AuthContext.jsx 2>nul
type nul > src\contexts\ExportContext.jsx 2>nul
type nul > src\contexts\ImportContext.jsx 2>nul

REM Create hook files
type nul > src\hooks\useAuth.js 2>nul
type nul > src\hooks\useDataValidation.js 2>nul
type nul > src\hooks\useExport.js 2>nul
type nul > src\hooks\useFileUpload.js 2>nul
type nul > src\hooks\useImport.js 2>nul
type nul > src\hooks\useLocalStorage.js 2>nul

REM Create page files
type nul > src\pages\AdminDashboard.jsx 2>nul
type nul > src\pages\AnalyticsPage.jsx 2>nul
type nul > src\pages\CreateParcelPage.jsx 2>nul
type nul > src\pages\Dashboard.jsx 2>nul
type nul > src\pages\DeliveredPage.jsx 2>nul
type nul > src\pages\ExportPage.jsx 2>nul
type nul > src\pages\HelpPage.jsx 2>nul
type nul > src\pages\HistoryPage.jsx 2>nul
type nul > src\pages\ImportPage.jsx 2>nul
type nul > src\pages\NotificationsPage.jsx 2>nul
type nul > src\pages\ParcelsPage.jsx 2>nul
type nul > src\pages\PendingPage.jsx 2>nul
type nul > src\pages\RevenuePage.jsx 2>nul
type nul > src\pages\SettingsPage.jsx 2>nul
type nul > src\pages\TrackPage.jsx 2>nul
type nul > src\pages\UserDashboard.jsx 2>nul
type nul > src\pages\UsersPage.jsx 2>nul
type nul > src\pages\QRBookingPage.jsx 2>nul
type nul > src\pages\CustomerChatPage.jsx 2>nul

REM Create service files
type nul > src\services\authService.js 2>nul
type nul > src\services\dataTransformer.js 2>nul
type nul > src\services\exportFormatter.js 2>nul
type nul > src\services\fileParser.js 2>nul
type nul > src\services\parcelService.js 2>nul
type nul > src\services\storageService.js 2>nul
type nul > src\services\validationRules.js 2>nul

REM Create util files
type nul > src\utils\constants.js 2>nul
type nul > src\utils\formatters.js 2>nul
type nul > src\utils\helpers.js 2>nul
type nul > src\utils\validators.js 2>nul

REM Create root files
type nul > src\404.html 2>nul
type nul > src\App.jsx 2>nul
type nul > src\index.css 2>nul
type nul > src\index.js 2>nul
type nul > src\reportWebVitals.js 2>nul
type nul > src\routes.jsx 2>nul

REM Create asset file (sample)
echo. 2>nul > src\assets\icons\export.png

echo Project structure created successfully!