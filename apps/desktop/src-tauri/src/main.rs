#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[cfg(target_os = "macos")]
use cocoa::appkit::{NSWindow, NSWindowStyleMask, NSWindowTitleVisibility};

use std::env;
use std::io::BufReader;
use tauri::{
  CustomMenuItem, Manager, RunEvent, Runtime, SystemTray, SystemTrayEvent, SystemTrayMenu,
  SystemTrayMenuItem, Window, WindowEvent,
};
use tauri_plugin_log::LogTarget;
use window_shadows::set_shadow;
use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};

#[derive(Clone, serde::Serialize)]
struct Payload {
  args: Vec<String>,
  cwd: String,
}

#[tauri::command]
async fn play_notification_sound(app_handle: tauri::AppHandle) {
  let resource_path = app_handle
      .path_resolver()
      .resolve_resource("../assets/audio/notification.mp3")
      .expect("failed to resolve resource dir");

  let (_stream, handle) = rodio::OutputStream::try_default().unwrap();
  let sink = rodio::Sink::try_new(&handle).unwrap();

  let file = std::fs::File::open(&resource_path).unwrap();
  sink.append(rodio::Decoder::new(BufReader::new(file)).unwrap());
  sink.sleep_until_end();
}

pub trait WindowExt {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, title_transparent: bool, remove_toolbar: bool);
}

impl<R: Runtime> WindowExt for Window<R> {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, title_transparent: bool, remove_tool_bar: bool) {
        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;
            NSWindow::setTitlebarAppearsTransparent_(id, cocoa::base::YES);
            let mut style_mask = id.styleMask();
            style_mask.set(
                NSWindowStyleMask::NSFullSizeContentViewWindowMask,
                title_transparent,
            );

            if remove_tool_bar {
                style_mask.remove(
                    NSWindowStyleMask::NSClosableWindowMask
                        | NSWindowStyleMask::NSMiniaturizableWindowMask
                        | NSWindowStyleMask::NSResizableWindowMask,
                );
            }

            id.setStyleMask_(style_mask);

            id.setTitleVisibility_(if title_transparent {
                NSWindowTitleVisibility::NSWindowTitleHidden
            } else {
                NSWindowTitleVisibility::NSWindowTitleVisible
            });

            id.setTitlebarAppearsTransparent_(if title_transparent {
                cocoa::base::YES
            } else {
                cocoa::base::NO
            });
        }
    }
}

fn create_system_tray() -> SystemTray {
  let quit = CustomMenuItem::new("Quit".to_string(), "Quit");
  let show = CustomMenuItem::new("Show".to_string(), "Show");
  let hide = CustomMenuItem::new("Hide".to_string(), "Hide");
  let tray_menu = SystemTrayMenu::new()
      .add_item(show)
      .add_item(hide)
      .add_native_item(SystemTrayMenuItem::Separator)
      .add_item(quit);
  SystemTray::new().with_menu(tray_menu)
}

fn main() {
  tauri::Builder::default()
      .setup(|app| {
        let window = app.get_window("main").unwrap();
        //   #[cfg(target_os = "macos")]
        //   app.set_activation_policy(tauri::ActivationPolicy::Accessory);

        #[cfg(any(windows, target_os = "macos"))]
        set_shadow(&window, true).unwrap();

        #[cfg(target_os = "macos")]
        apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None).expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

        #[cfg(target_os = "windows")]
        apply_blur(&window, Some((18, 18, 18, 125))).expect("Unsupported platform! 'apply_blur' is only supported on Windows");

        let win = app.get_window("main").unwrap();
        #[cfg(target_os = "macos")]
        win.set_transparent_titlebar(true, false);

        Ok(())
      })
      .system_tray(create_system_tray())
      .on_system_tray_event(|app, event| match event {
          SystemTrayEvent::LeftClick { .. } => {
              let window = app.get_window("main").unwrap();
              let visible = window.is_visible().unwrap();
              if visible {
                  window.hide().unwrap();
              } else {
                  window.show().unwrap();
                  window.set_focus().unwrap();
              }
          }
          SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
              "Hide" => {
                  let window = app.get_window("main").unwrap();
                  window.hide().unwrap();
              }
              "Show" => {
                  let window = app.get_window("main").unwrap();
                  window.show().unwrap();
                  window.center().unwrap();
              }
              "Quit" => {
                  std::process::exit(0);
              }
              _ => {}
          },
          _ => {}
      })
      .invoke_handler(tauri::generate_handler![play_notification_sound])
      .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
          println!("{}, {argv:?}, {cwd}", app.package_info().name);

          app.emit_all("single-instance", Payload { args: argv, cwd })
              .unwrap();
      }))
      .plugin(
          tauri_plugin_log::Builder::default()
              .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
              .build(),
      )
      .build(tauri::generate_context!())
      .expect("error while running tauri application")
      .run(|app, event| match event {
          RunEvent::WindowEvent { label, event, .. } => match event {
              WindowEvent::CloseRequested { api, .. } => {
                  let window = app.get_window(label.as_str()).unwrap();
                  window.hide().unwrap();
                  api.prevent_close();
              }
              _ => {}
          },
          _ => {}
      });
}
