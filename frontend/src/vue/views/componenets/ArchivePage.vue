<template>
  <ul id="tabs-swipe-demo" class="tabs">
    <li class="tab col s3"><a id="spec-tab" class="active" href="#tab-spec-tab">Spec</a></li>
    <li class="tab col s3"><a id="code-tab" href="#tab-code-tab">Code</a></li>
    <li class="tab col s3"><a id="other-tab" href="#tab-other-tab">Other</a></li>
  </ul>
  <div id="tab-spec-tab" class="col s12"><iframe src="https://drive.google.com/file/d/150DbTO4RfntszO82PCvUNRw0b86IbQDl/preview" width="640" height="480" allow="autoplay"></iframe></div>
  <div id="tab-code-tab" class="col s12"><ul style="list-style: none" id="list"></ul></div>
  <div id="tab-other-tab" style="height: 91.4%" class="col s12"><iframe style="height: -webkit-fill-available; width: -webkit-fill-available" src="https://docs.google.com/document/d/e/2PACX-1vSduKht6VPleDFOaqnIAEmJAVTwPQveBs6hE4oV4TB3Rbulh-1QkEhV20pMNVmZAZUY6sq88NoGl8xg/pub?embedded=true"></iframe></div>
  <script>
    let params = {};
    window.location.search
      .replace("?", "")
      .split("&")
      .forEach((param) => {
        let [key, value] = param.split("=");
        params[key] = value;
      });
    if (!params.tab) params.tab = "spec";
    if (!params.dir) params.dir = "";
    const validTabs = ["code", "spec", "other"];

    if (params.tab && validTabs.includes(params.tab)) {
      document.getElementById(`${params.tab}-tab`).classList.add("active");
    } else {
      document.getElementById("spec-tab").classList.add("active");
    }
    M.AutoInit();

    const list = document.getElementById("list");
    let username = "jman13378";
    let repo = "TSA-Software-2024";
    /// this has to only be done through the backend as having this in page is a security issue
    let fgt = "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";
    function RefDirectory(dir) {
      let xhr = new XMLHttpRequest();
      if (fgt) xhr.open("GET", `https://api.github.com/repos/${username}/${repo}/contents/${dir}`);
      xhr.setRequestHeader("Authorization", `Bearer ${fgt}`);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          let json = JSON.parse(xhr.responseText);
          let directories = ""; // Store HTML string
          let files = ""; // Store HTML string
          for (let res of json) {
            if (res.type == "dir") {
              directories += `<li>  <i class="material-icons">folder</i> ${res.name}</li>`;
            } else if (res.type == "file") {
              files += `<li>  <i class="material-icons">description</i> ${res.name}</li>`;
            }
          }
          // Set innerHTML only once after constructing the HTML string
          list.innerHTML = directories + files;
        }
      };

      xhr.send();
    }

    RefDirectory(params.dir || "");
  </script>
</template>
<script>
import { socket } from "../../../globals.js";
export default {
  name: "ArchivePage",
  props: {
    project_name: String,
  },
  data() {
    return {
      project: {
        name: this.project_name,
        spec: [],
        code: [],
        other: [],
      },
    };
  },
  methods: {
    fetchDirectory() {},
  },
  created() {
    socket.emit("archiveInfo", { project_name: this.project_name }, (response) => {
      response.spec;
    });
  },
};
</script>
