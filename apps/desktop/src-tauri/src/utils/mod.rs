pub fn get_config_path() -> String {
    let config_dir = tauri::api::path::config_dir()
        .unwrap()
        .to_str()
        .unwrap()
        .to_owned();

    let config_dir = config_dir + "/chronowise";
    config_dir
}
