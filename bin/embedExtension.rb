#!/usr/bin/env ruby
require 'rubygems'
require 'xcodeproj'

project_location = './' # running as bin from root project
extension_proj = 'RNTodayWidgetExtension.xcodeproj'
project_path = Dir.glob("#{project_location}ios/*.{xcodeproj,xcworkspace}").first
extension_path = "#{project_location}node_modules/react-native-today-widget/ios/#{extension_proj}"
abort "Couldn't find XCode project in '#{project_location}ios/'" if project_path.nil?

# load XCode projects and targets
project = Xcodeproj::Project.open(project_path)
app_target = project.targets.find { |t| !t.name['^(?!.*(tvOS|Tests)).*$'] }

extension_ref = project.files.find do |file|
  file.name == extension_proj
end

extension = Xcodeproj::Project.open('./node_modules/' + extension_ref.path)
appex = extension.products.first

# add PBXContainerItemProxy as proxy for appex object, because it is from extension project
container_item = project.new(Xcodeproj::Project::Object::PBXContainerItemProxy)
container_item.container_portal = extension_ref.uuid
container_item.proxy_type = "2"
container_item.remote_info = "TodayWidgetExtension"
container_item.remote_global_id_string = appex.uuid

# add PBXReferenceProxy as proxy for appex reference
reference_proxy = project.new(Xcodeproj::Project::Object::PBXReferenceProxy)
reference_proxy.file_type = appex.explicit_file_type
reference_proxy.path = appex.path
reference_proxy.remote_ref = container_item
reference_proxy.source_tree = appex.source_tree

# add PBXGroup with proxy reference in childern
products_group = project.new(Xcodeproj::Project::Object::PBXGroup)
products_group.name = 'Products'
products_group.source_tree = "<group>"
products_group<<reference_proxy

project_reference = Xcodeproj::Project::ObjectDictionary.new(project.root_object.references_by_keys_attributes.first, project.root_object)
project_reference['ProjectRef'] = extension_ref
project_reference['ProductGroup'] = products_group
project.root_object.project_references << project_reference

extension_ref = project.files.find do |file|
  file.name == extension_proj
end

# add extension target as dependency for app target
extension.targets.each do |target|
 dependency = app_target.dependency_for_target(target)
   if dependency
     puts "[WARN] App already has dependency on #{target.name}"
   else
     app_target.add_dependency(target)
   end
end

# try to find existin copy files build phase
embed_extensions_phase = app_target.copy_files_build_phases.find do |copy_phase|
  copy_phase.symbol_dst_subfolder_spec == :plug_ins
end

# create new copy files build phase if there is no for plugins
if embed_extensions_phase.nil?
  embed_extensions_phase = app_target.new_copy_files_build_phase()
  embed_extensions_phase.symbol_dst_subfolder_spec = :plug_ins
  embed_extensions_phase.name = 'Embed App Extensions'
end

# retrieve correct reference to binary from extension
appex_ref = extension_ref.file_reference_proxies.first

# embed extension binary to copy files build phase
appex_included = embed_extensions_phase.files_references.include? appex_ref
if appex_included
  puts "[WARN] App already embeds #{appex_ref.path}"
else
  if appex_ref.nil?
    puts "[WARN] Could not find proper binary to be embed"
  else
    build_file = embed_extensions_phase.add_file_reference(appex_ref)
    build_file.settings = { "ATTRIBUTES" => ['RemoveHeadersOnCopy'] }
    # save XCode project
    project.save
  end
end

puts 'App Extension linked and binary embeded'
