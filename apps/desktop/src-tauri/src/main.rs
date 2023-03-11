#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use cocoa::appkit::{NSWindow, NSWindowStyleMask};
use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent, Manager, Runtime, Window};

pub trait WindowExt {
  #[cfg(target_os = "macos")]
  fn set_transparent_titlebar(&self, transparent: bool);
}

impl<R: Runtime> WindowExt for Window<R> {
  #[cfg(target_os = "macos")]
  fn set_transparent_titlebar(&self, transparent: bool) {
    use cocoa::appkit::NSWindowTitleVisibility;

    unsafe {
      let id = self.ns_window().unwrap() as cocoa::base::id;

      let mut style_mask = id.styleMask();
      style_mask.set(
        NSWindowStyleMask::NSFullSizeContentViewWindowMask,
        transparent,
      );
      id.setStyleMask_(style_mask);

      id.setTitleVisibility_(if transparent {
        NSWindowTitleVisibility::NSWindowTitleHidden
      } else {
        NSWindowTitleVisibility::NSWindowTitleVisible
      });
      id.setTitlebarAppearsTransparent_(if transparent {
        cocoa::base::YES
      } else {
        cocoa::base::NO
      });
    }
  }
}

fn main() {
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let about = CustomMenuItem::new("about".to_string(), "About Chronosphere");
    let settings = CustomMenuItem::new("settings".to_string(), "Settings");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new()
    .add_item(show)
    .add_item(about)
    .add_item(settings)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);

    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .setup(|app| {
          let main = app.get_window("main").unwrap();
          main.set_transparent_titlebar(true);

          Ok(())
        })
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
              let main = app.get_window("main").unwrap();
              if main.is_visible().unwrap() {
                main.hide().unwrap();
              } else {
                main.show().unwrap();
                main.unminimize().unwrap();
                main.set_focus().unwrap();
              }
            }
            SystemTrayEvent::MenuItemClick { id, .. } => {
              match id.as_str() {
                "show" => {
                  let main = app.get_window("main").unwrap();
                  if main.is_visible().unwrap() {
                    main.hide().unwrap();
                  } else {
                    main.show().unwrap();
                    main.unminimize().unwrap();
                    main.set_focus().unwrap();
                  }
                }
                "quit" => {
                  app.exit(0);
                }
                _ => {}
              }
            }
            _ => {}
          })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
