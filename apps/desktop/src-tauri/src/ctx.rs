use crate::prelude::*;
use serde::Serialize;
use std::sync::Arc;
use tauri::{AppHandle, Manager, Wry};

pub struct Ctx {
    app_handle: Option<AppHandle<Wry>>,
}

impl Ctx {
    pub fn from_app(app: AppHandle<Wry>) -> Result<Arc<Self>, String>{
        Ok(Arc::new(Ctx::new(app)))
    }
}

impl Ctx {
    pub fn new(app_handle: AppHandle<Wry>) -> Self {
        Ctx {
            app_handle: Some(app_handle),
        }
    }

    #[allow(dead_code)]
    pub async fn test() -> Arc<Self> {
        Arc::new(Self {
            app_handle: None,
        })
    }

    pub fn emit_event<D: Serialize + Clone>(&self, event: &str, data: D) {
        if let Some(app_handle) = &self.app_handle {
            let _ = app_handle.emit_all(event, data);
        }
    }
}